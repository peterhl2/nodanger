import MySQLdb

user = None
days = {1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thurday", 5:"Friday", 6:"Saturday", 0:"Sunday"}
# define a class
class CrimeDB:
    lengthDiff = 0.00159

    def __init__(self):
        self.db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                             user="root",         # your username
                             passwd="strangerdanger",  # your password
                             db="crime_schema")

        self.cur = self.db.cursor()

    def checkUserExists(self, username):
        user = self.cur.execute("SELECT name FROM users WHERE name=%s", [username])
        if user != 0:
            return True
        return False

    def insert_newuser(self, username, passwd):
        self.cur.execute("INSERT INTO users (name, password) VALUES (%s, %s)", [username, passwd])
        self.db.commit()

    def insert_login(self, data):
        print(data)
        print(user)
        print(days[data['weekday']])
        day = days[data['weekday']]

        self.cur.execute("""INSERT INTO logins (username, weekday, day, month, year, hour)
                         VALUES (%s,%s,%s,%s,%s,%s)""", [user, day, data['day'], data['month'], data['year'], data['hour']])
        self.db.commit()

    def insert(self, crimeid):
        self.cur.execute("INSERT INTO crimedata (id) VALUES (%s)", [crimeid])
        self.db.commit()

    def delete(self, crimeid):
        self.cur.execute("DELETE FROM crimedata WHERE id=%s", [crimeid])
        self.db.commit()

    def update(self, crimeid, crime_type):
        self.cur.execute("UPDATE crimedata SET crime_type=%s WHERE id=%s", [crimeid, crime_type])
        self.db.commit()

    def getCrimeTypes(self):
        self.cur.execute("SELECT DISTINCT crime_type FROM crimedata")
        crime_types = self.cur.fetchall()
        print("HELLO")
        return crime_types

    def getCrimeById(self, id):
        self.cur.execute("SELECT * FROM crimedata WHERE id=%s", [id])
        crime = self.cur.fetchall()
        return crime

    def getCrimeAtTimeOfLogin(self, username):
        # change peter to username
        self.cur.execute("""
                    SELECT crime_type, COUNT(*)
                    FROM crimedata
                    WHERE id = ANY (
                    SELECT c.id
                    FROM crimedata c, logins l, users u
                    WHERE l.username = "peter" and c.weekday = l.weekday and l.hour = c.hour)
                    GROUP BY crime_type
                    """)
        crimes = self.cur.fetchall()
        return crimes

    # returns crimes types and counts at location and time
    # used by safestpath feature
    def getCrimeAtTimeAndLocation(self, weekday, hour, lat, lng):
        # change peter to username
        self.cur.execute("""
                    SELECT crime_type, COUNT(*)
                    FROM crimedata
                    WHERE latitude < %s+0.00159 AND latitude > %s-0.00159
                    AND longitude < %s+0.00159 AND longitude > %s-0.00159
                    AND weekDay = %s AND hour = %s
                    GROUP BY crime_type
                    """,[lat, lat, lng, lng, weekday, hour])
        crimes = self.cur.fetchall()
        return crimes

    def getCrimeByType(self, crime_type):
        self.cur.execute("SELECT * FROM crimedata WHERE crime_type=%s", [crime_type])
        crimeOfType = self.cur.fetchall()
        return crimeOfType

    def getCrimeAtLocation(self, lat, long):
        # change 40 to lat also add long
        self.cur.execute("""
                    SELECT crime_type, COUNT(*)
                    FROM crimedata WHERE latitude < 40+(3/69) AND latitude > 40+(1/69)
                    GROUP BY crime_type
                    """)
        crimes = self.cur.fetchall()
        return crimes

#test
# crimeDB = CrimeDB()
# data = {'weekday':"6", "day":"23", "month":"2", "year":"2019", "hour":"4"}
# crimeDB.insert_login(data)
