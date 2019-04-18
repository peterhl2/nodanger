from http.server import SimpleHTTPRequestHandler,HTTPServer
from pathlib import Path
import sys
import os
import subprocess
import argparse
import json
import queries
from route import safestpath
from route import getCrimeRatings
from dangerclusters import getDangerNodes


index_dir = 'nodanger/build'
weekday = ""
hour = ""
if 'PORT' in os.environ:
    PORT_NUMBER = int(os.environ['PORT'])
else:
    PORT_NUMBER = 8000
    
class RequestHandler(SimpleHTTPRequestHandler):
    #used to store parameters for queries requests
    insertparams = []
    deleteparams = []
    updateconditions = ""
    params = ""
    route = ""
    # intialize database object for access data
    crimeDB = queries.CrimeDB()
    user = ""

    def __init__(self, request, client_address, server):
        # stupid cross-platform way to change directory to nodanger/src/build

        web_dir = os.getcwd()
        for dir in ('nodanger','build'):
            web_dir = os.path.join(web_dir, dir)
        self.route_mapping = {
            '/': self.get_homepage,
            '/getdata': self.get_data,
            '/sendlogin': self.update_login,
            '/senduserexists': self.user_exists,
            '/sendusersignup': self.user_signup,
            '/sendsafe': self.send_safestPath,
            '/senddate': self.query_dates,
            '/getcrimetypes': self.get_crimetypes,
            '/getcrime': self.get_crime,
            '/getcrimebytype': self.get_crimebytype,
            '/groupdanger': self.get_danger_clusters,
            '/insert': self.insert,
            '/delete': self.delete,
            '/update': self.update,
            '/getnumberofcrimes': self.getNumberOfCrimes,
            '/getuserinfo': self.getuserinfo
        }

        self.build_directory = web_dir
        SimpleHTTPRequestHandler.__init__(self, request, client_address, server)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_GET(self):

        # runs if path matches file in build directory
        request_path = Path(os.path.join(self.build_directory, self.path[1:]))
        # print('route', request_path)
        if request_path.is_file():
            print('GET file %s' % self.path)
            self.send_response(200)
            self.end_headers()
            with open(str(request_path), 'rb') as file:
                self.wfile.write(file.read())

        else:

            try:
                #parse routeMap for paramters
                routeMap = self.path
                if routeMap == "/":
                    self.route = routeMap
                    api_fn = self.route_mapping[self.route]
                    return api_fn()
                else:
                    route_splt = routeMap.split("/")

                    self.route = "/"+route_splt[1]

                    if len(route_splt) == 3:
                        self.param = route_splt[2].replace("%20", " ")
                    elif len(route_splt) > 3:
                        self.param = route_splt[2].replace("%20", " ")
                        self.updateconditions = route_splt[3].replace("%20", " ")
                        # print(self.param)
                    api_fn = self.route_mapping["/"+route_splt[1]]
                    return api_fn()

            except:
                print('no api fn found for %s' % self.route)

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
        self.wfile.write(json.dumps("HELLO").encode('utf-8'))
        return

    def query_dates(self, data):
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        self.wfile.write(json.dumps(False).encode('utf-8'))
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
        crime_types = self.crimeDB.getCrimeTypes()
        self.wfile.write(json.dumps(crime_types).encode('utf-8'))
        return

    def get_crime(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        crime = self.crimeDB.getCrimeAtTimeOfLogin()
        dots = getCrimeRatings(crime)
        self.wfile.write(json.dumps(dots).encode('utf-8'))
        return

    def get_crimebytype(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        crimes = self.crimeDB.getCrimeByType(self.param)
        self.wfile.write(json.dumps(crimes).encode('utf-8'))
        return

    def insert(self):
        """
            route: getCrimeTypes
            returns: crime types
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        crimes = self.crimeDB.insert(self.param)
        self.wfile.write(json.dumps("INSERT SUCCESSFUL").encode('utf-8'))
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
        crimes = self.crimeDB.delete(self.param)
        self.wfile.write(json.dumps("DELETED SUCCESSFUL").encode('utf-8'))
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
        crimes = self.crimeDB.update(self.updateconditions, self.param)
        self.wfile.write(json.dumps("UPDATED SUCCESSFUL").encode('utf-8'))
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
        crimes = self.crimeDB.getCrimeAtLocation(40, 40)
        self.wfile.write(json.dumps(crimes).encode('utf-8'))
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
        crimes = self.crimeDB.getCrimeAtTimeOfLogin("peter")
        self.wfile.write(json.dumps(crimes).encode('utf-8'))
        return

    def send_safestPath(self, data):
        """
            route: senddata
            returns: success message that we received data
            called from App.js (componentDidMount)
        """
        # self.send_response(201)
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        route = safestpath(queries.weekday, queries.hour, int(data['start']), int(data['dest']))
        self.wfile.write(json.dumps(route).encode('utf-8'))
        return

    def get_danger_clusters(self, data):
        """
            route: senddata
            returns: success message that we received data
            called from App.js (componentDidMount)
        """
        # self.send_response(201)
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        dangerclusters = getDangerNodes(queries.user)
        self.wfile.write(json.dumps(dangerclusters).encode('utf-8'))
        return

    def user_exists(self, data):
        """
            route: senddata
            returns: success message that we received data
            called from App.js (componentDidMount)
        """
        exists = False
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        exists = self.crimeDB.checkUserExists(data['username'], data['password'])
        if exists:
            queries.user = data['username']

        self.wfile.write(json.dumps(exists).encode('utf-8'))

        return

    def user_signup(self, data):
        """
            route: senddata
            returns: success message that we received data
            called from App.js (componentDidMount)
        """
        # self.send_response(201)
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        if not self.crimeDB.checkUserExists(data['username'], data['password']):
            self.crimeDB.insert_newuser(data['username'], data['password'])

        queries.user = data['username']
        self.wfile.write(json.dumps(True).encode('utf-8'))

        return

    def update_login(self, data):
        """
            route: senddata
            returns: success message that we received data
            called from App.js (componentDidMount)
        """
        # self.send_response(201)
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        self.crimeDB.update_login(data)
        queries.weekday = data['weekday']
        queries.hour = data['hour']
        self.wfile.write(json.dumps(True).encode('utf-8'))

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
