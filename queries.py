import MySQLdb
import os

user = None
weekday = None
hour = None
days = {1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday", 0:"Sunday"}
# define a class
class CrimeDB:
    lengthDiff = 0.00159

    def __init__(self):

        if 'PORT' not in os.environ:
            # then connect to localhost
            self.db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                                 user="root",         # your username
                                 passwd="strangerdanger",  # your password
                                 db="crime_schema")

            self.cur = self.db.cursor()

    # added for
    def cloud_connect(self):
        if 'PORT' in os.environ:
            self.db = MySQLdb.connect(host="us-cdbr-iron-east-02.cleardb.net",
                user="b2f8d35aaf8c31",
                passwd="ab22610f",
                db="heroku_d9d316ecf97289a")
            self.cur = self.db.cursor()

    def checkUserExists(self, username, password):
        self.cloud_connect()
        user = self.cur.execute("SELECT name FROM users WHERE name=%s AND password=%s", [username,password])
        if user != 0:
            return True
        return False

    def insert_newuser(self, username, passwd):
        self.cloud_connect()
        self.cur.execute("INSERT INTO users (name, password) VALUES (%s, %s)", [username, passwd])
        self.cur.execute("INSERT INTO logins (username) VALUES (%s)", [username])
        self.db.commit()

    def update_login(self, data):
        self.cloud_connect()
        day = days[data['weekday']]

        self.cur.execute("""
                        UPDATE logins
                        SET weekday=%s, day=%s, month=%s, year=%s, hour=%s
                        WHERE username=%s
                        """, [day, data['day'], data['month'], data['year'], data['hour'], user])

        self.db.commit()

    def insert(self, crimeid):
        self.cloud_connect()
        self.cur.execute("INSERT INTO crimedata (id) VALUES (%s)", [crimeid])
        self.db.commit()

    def delete(self, crimeid):
        self.cloud_connect()
        self.cur.execute("DELETE FROM crimedata WHERE id=%s", [crimeid])
        self.db.commit()

    def update(self, crimeid, crime_type):
        self.cloud_connect()
        self.cur.execute("UPDATE crimedata SET crime_type=%s WHERE id=%s", [crimeid, crime_type])
        self.db.commit()

    def getCrimeTypes(self):
        self.cloud_connect()
        self.cur.execute("SELECT DISTINCT crime_type FROM crimedata")
        crime_types = self.cur.fetchall()
        return crime_types

    def getCrimeById(self, id):
        self.cloud_connect()
        self.cur.execute("SELECT * FROM crimedata WHERE id=%s", [id])
        crime = self.cur.fetchall()
        return crime

    def getCrimeAtTimeOfLogin(self):
        self.cloud_connect()
        # change peter to username
        self.cur.execute("""
                    SELECT latitude, longitude, crime_type
                    FROM crimedata
                    WHERE id = ANY (
                    SELECT c.id
                    FROM crimedata c, logins l, users u
                    WHERE l.username = %s and c.weekDay = l.weekday and l.hour = c.hour)
                    """, [user])
        crimes = self.cur.fetchall()
        return crimes

    # returns crimes types and counts at location and time
    # used by safestpath feature
    def getCrimeAtTimeAndLocation(self, wday, hour, lat, lng):
        self.cloud_connect()
        # change peter to username
        wd = days[wday]
        self.cur.execute("""
                    SELECT crime_type, COUNT(*)
                    FROM crimedata
                    WHERE latitude < %s+0.00159 AND latitude > %s-0.00159
                    AND longitude < %s+0.00159 AND longitude > %s-0.00159
                    AND weekDay = %s AND hour = %s
                    GROUP BY crime_type
                    """,[lat, lat, lng, lng, wd, hour])
        crimes = self.cur.fetchall()
        return crimes

    def getCrimeByType(self, crime_type):
        self.cloud_connect()
        self.cur.execute("SELECT * FROM crimedata WHERE crime_type=%s", [crime_type])
        crimeOfType = self.cur.fetchall()
        return crimeOfType

    def getCrimeAtLocation(self, lat, lng):
        self.cloud_connect()
        # change 40 to lat also add long
        self.cur.execute("""
                    SELECT crime_type, COUNT(*)
                    FROM crimedata
                    WHERE latitude < %s+0.00159 AND latitude > %s-0.00159
                    AND longitude < %s+0.00159 AND longitude > %s-0.00159
                    GROUP BY crime_type
                    """,[lat, lat, lng, lng])
        crimes = self.cur.fetchall()
        return crimes

#test
# crimeDB = CrimeDB()
# user = "bingbong"
# print(crimeDB.insert_newuser(user, "bob"))
