from http.server import SimpleHTTPRequestHandler,HTTPServer
import sys
import os
import subprocess
import argparse
import json

PORT_NUMBER = 8080
index_dir = 'nodanger/build'

class RequestHandler(SimpleHTTPRequestHandler):

    def __init__(self, request, client_address, server):
        # stupid cross-platform way to change directory to nodanger/src/build
        web_dir = os.getcwd()
        for dir in ('nodanger','build'):
            web_dir = os.path.join(web_dir, dir)

        # server_dir = os.path.join(os.getcwd(), index_dir)
        SimpleHTTPRequestHandler.__init__(
            self, request, client_address, server, directory=web_dir)

    def do_GET(self):
        route_mapping = {
            '/': self.get_homepage,
            '/data': self.get_data
        }

        try:
            api_fn = route_mapping[self.path.lower()]
            return api_fn()

        except:
            pass
            # print('bad request to {}'.format(self.path).encode('utf-8'))
            # self.send_response(200)
            # self.send_header('Content-type','text/html')
            # self.end_headers()
            # self.wfile.write('Bad url {}'.format(self.path).encode('utf-8'))

    def do_POST(self):

        route_mapping = {
            '/': self.get_home,
            '/data': self.get_data
        }

        try:
            api_fn = route_mapping[self.path.lower()]
            return api_fn()

        except:
            print('bad request to {}'.format(self.path).encode('utf-8'))
            self.send_response(200)
            self.send_header('Content-type','text/html')
            self.end_headers()
            self.wfile.write('Bad url {}'.format(self.path).encode('utf-8'))


    def get_homepage(self):
        """
            route: /
            returns: homepage
        """
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        self.wfile.write("This is the homepage".encode('utf-8'))
        return

    def get_data(self):
        """
            route: data
            returns: some data
        """
        print('let\'s get some data')
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        myjson = {'some key': 'some val'}
        self.wfile.write(json.dumps(myjson).encode('utf-8'))
        return

def start_server():

    try:
        server = HTTPServer(('', PORT_NUMBER), RequestHandler)
        print('Started httpserver on port ' , PORT_NUMBER)

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