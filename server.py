from http.server import SimpleHTTPRequestHandler,HTTPServer
from pathlib import Path
import sys
import os
import subprocess
import argparse
import json
# import MySQLdb

PORT_NUMBER = 8080
if os.environ['PORT'] is not None:
    print('using heroku port number %d' % int(os.environ['PORT']))
    PORT_NUMBER = int(os.environ['PORT'])
index_dir = 'nodanger/build'
# mysql://b2f8d35aaf8c31:ab22610f@us-cdbr-iron-east-02.cleardb.net/heroku_d9d316ecf97289a?reconnect=true
# Establish connection to local database
# db = MySQLdb.connect(host="localhost",    # your host, usually localhost
#                      user="root",         # your username
#                      passwd="strangerdanger",  # your password
#                      db="crime_schema")
#
# cur = db.cursor()

class RequestHandler(SimpleHTTPRequestHandler):
    #used to store parameters for queries requests
    insertparams = []
    deleteparams = []
    updateconditions = ""
    params = ""
    route = ""

    def parse_route(routeMap):
        print(routeMap)
        if routeMap == "/":
            return routeMap
        route_splt = routeMap.split("/")
        print(route_splt)
        route = "/"+route_splt[1]
        print(route)
        if len(route_splt) > 2:
            param = route_splt[2]
        return route

    def getCrimeTypes():
        # cur.execute("SELECT DISTINCT crime_type FROM crimedata")
        # crime_types = cur.fetchall()
        # return crime_types
        pass

    def __init__(self, request, client_address, server):
        # stupid cross-platform way to change directory to nodanger/src/build
        web_dir = os.getcwd()
        for dir in ('nodanger','build'):
            web_dir = os.path.join(web_dir, dir)
        self.route_mapping = {
            '/': self.get_homepage,
            '/getdata': self.get_data,
            '/senddata': self.send_data,
            '/getcrimetypes': self.get_crimetypes,
            '/getcrimebyid': self.get_crimebyid,
            '/getcrimebytype': self.get_crimebytype,
            '/insert': self.insert,
            '/delete': self.delete,
            '/update': self.update,
            '/getnumberofcrimes': self.getNumberOfCrimes,
            '/getuserinfo': self.getuserinfo
        }

        SimpleHTTPRequestHandler.__init__(
            self, request, client_address, server, directory=web_dir)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_GET(self):

        # runs if path matches file in build directory
        request_path = Path(os.path.join(self.directory, self.path[1:]))
        # print('route', request_path)
        if request_path.is_file():
            print('GET file %s' % self.path)
            self.send_response(200)
            self.end_headers()
            with open(str(request_path), 'rb') as file:
                self.wfile.write(file.read())

        else:

            try:
                print('\n\n\n')
                #parse routeMap for paramters
                routeMap = self.path
                print(routeMap)
                if routeMap == "/":
                    self.route = routeMap
                    api_fn = self.route_mapping[self.route]
                    return api_fn()
                else:
                    route_splt = routeMap.split("/")

                    self.route = "/"+route_splt[1]
                    # print(self.route)
                    # print("route is:")
                    # print(self.route_mapping[self.route])
                    # print(self.get_crimebytype)
                    # print(route)
                    if len(route_splt) == 3:
                        self.param = route_splt[2].replace("%20", " ")
                    elif len(route_splt) > 3:
                        self.param = route_splt[2].replace("%20", " ")
                        self.updateconditions = route_splt[3].replace("%20", " ")
                        # print(self.param)
                    api_fn = self.route_mapping["/"+route_splt[1]]
                    return api_fn()



                # print("\n" + self.param)
                # print("HELLO")

                # api_fn = self.route_mapping[self.route]
                # return api_fn()

            except:
                print('no api fn found for %s' % self.route)
                # print('bad request to {}'.format(self.path).encode('utf-8'))
                # self.send_response(200)
                # self.send_header('Content-type','text/html')
                # self.end_headers()
                # self.wfile.write('Bad url {}'.format(self.path).encode('utf-8'))

    def do_POST(self):

        body_size = int(self.headers['Content-Length'])
        body = self.rfile.read(body_size)
        js = json.loads(body)

        try:
            api_fn = self.route_mapping[self.path.lower()]
            return api_fn(js)

        except:
            pass
            # print('bad request to {}'.format(self.path).encode('utf-8'))
            # self.send_response(200)
            # self.send_header('Content-type','text/html')
            # self.end_headers()
            # self.wfile.write('Bad url {}'.format(self.path).encode('utf-8'))


    def get_homepage(self):
        """
            route: /
            returns: homepage
        """
        self.path = '/index.html'
        return self.do_GET()


    def get_data(self):
        """
            route: getdata
            returns: some data
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        # data = queries.getCrimeByType()
        self.wfile.write(json.dumps("HELLO").encode('utf-8'))
        return

    def get_crimetypes(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        # cur.execute("SELECT DISTINCT crime_type FROM crimedata")
        # crime_types = cur.fetchall()
        # self.wfile.write(json.dumps(crime_types).encode('utf-8'))
        return

    def get_crimebyid(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        # cur.execute("SELECT * FROM crimedata WHERE id=%s", [self.param])
        # crime = cur.fetchall()
        # self.wfile.write(json.dumps(crime).encode('utf-8'))
        # return

    def get_crimebytype(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        print("\n\n\nGOT THERE")
        print(self.param)
        # cur.execute("SELECT * FROM crimedata WHERE crime_type=%s", [self.param])
        # crimes = cur.fetchall()
        # self.wfile.write(json.dumps(crimes).encode('utf-8'))
        # return

    def insert(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        print("\n\n\nGOT THERE")
        print(self.param)
        # cur.execute("INSERT INTO crimedata (id) VALUES (%s)", [self.param])
        # self.wfile.write(json.dumps("INSERTED").encode('utf-8'))
        return

    def delete(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        print("\n\n\nGOT THERE")
        print(self.param)
        # cur.execute("DELETE FROM crimedata WHERE id=%s", [self.param])
        # self.wfile.write(json.dumps("DELETED").encode('utf-8'))
        return

    def update(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        print("\n\n\nGOT THERE")
        print(self.param, self.updateconditions)
        # cur.execute("UPDATE crimedata SET crime_type=%s WHERE id=%s", [self.updateconditions, self.param])
        # self.wfile.write(json.dumps("UPDATED").encode('utf-8'))
        return

    def getNumberOfCrimes(self):
        """
            route: getNumberOfCrimes
            returns: crime types and their counts in a 1 mile radius of user's Location
            uses: used for advanced function of calculating danger ratings for locations
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        print("\n\n\nGOT THERE")
        #replace 40 with users current Location
        # cur.execute("""
        #             SELECT crime_type, COUNT(*)
        #             FROM crimedata WHERE latitude < 40+(3/69) AND latitude > 40+(1/69)
        #             GROUP BY crime_type
        #             """)
        # crimes = cur.fetchall()
        # self.wfile.write(json.dumps(crimes).encode('utf-8'))
        return

    def getuserinfo(self):
        """
            route: getuserinfo
            returns: gets historical crime data of crimes that happened in urbana at the time of user login
            uses: advanced function to show only the crimes that occured at that moment in the past on
            google maps
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        print("\n\n\nGOT THERE")
        # cur.execute("""
        #             SELECT *
        #             FROM crimedata
        #             WHERE id = ANY (
        #             SELECT c.id
        #             FROM crimedata c, logins l, users u
        #             WHERE l.username = "peter" and c.weekday = l.weekday and l.hour = c.hour)
        #             """)
        # crimes = cur.fetchall()
        # self.wfile.write(json.dumps(crimes).encode('utf-8'))
        return

    def send_data(self, data):
        """
            route: senddata
            returns: success message that we received data
            called from App.js (componentDidMount)
        """
        self.send_response(201)
        print("\n\n\n\n")
        print(data)
        if(data['type'] == 'crimes'):
            print("BYE")
            response = queries.getCrimeTypes()

        print(response)
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return

def start_server():

    try:
        server = HTTPServer(('', PORT_NUMBER), RequestHandler)
        print('Started httpserver on http://localhost:%d' % PORT_NUMBER)

        server.serve_forever()

    except KeyboardInterrupt:
        print('^C received, shutting down the web server')
        server.socket.close()

def update():
    print('spawning child process to update react app:')
    cProcess = subprocess.run("cd nodanger/src && npm update", shell=True)
    print('completed with:\n\texit code {}'.format(cProcess.returncode))

def build():
    print('spawning child process to build react app:')
    cProcess = subprocess.run("cd nodanger/src && npm run build", shell=True)
    print('completed with:\n\texit code {}'.format(cProcess.returncode))


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Start server for hosting application and contacting database')
    parser.add_argument(
        '-update',
        action = 'store_true',
        help='runs \"npm update\" for react app via child process',
    )
    parser.add_argument(
        '-build',
        action = 'store_true',
        help='build react app via child process (else use current build)',
    )
    args = parser.parse_args()

    if args.update:
        update()
    if args.build:
        build()

    start_server()
