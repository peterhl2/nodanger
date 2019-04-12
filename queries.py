import MySQLdb


# define a class
class CrimeDB:
    lengthDiff = 0.00159

    def __init__(self):
        self.db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                             user="root",         # your username
                             passwd="strangerdanger",  # your password
                             db="crime_schema")

        self.cur = self.db.cursor()

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
                    """)
        crimes = self.cur.fetchall()
        return crimes

    def getCrimeAtTimeAndLocation(self, weekday, hour, lat, lng):
        # change peter to username
        self.cur.execute("""
                    SELECT crime_type, COUNT(*)
                    FROM crimedata WHERE latitude < %s+0.00159 AND latitude > %s-0.00159
                    AND longitude < %s+0.00159 AND longitude > %s-0.00159
                    GROUP BY crime_type
                    """,[lat, lat, lng, lng])
        crimes = self.cur.fetchall()
        return crimes

        # AND weekDay = %s AND hour = %s

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
