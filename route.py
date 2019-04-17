import queries
from danger_values import dangerVals
from road_network import intersections
from road_network import coordinates
import math

# DB instance
crimeDB = queries.CrimeDB()

# calculates dangerRatings for each location(vertex)
def getDangerRatings(weekday, hour):
    ratings = {}
    for i in range(0, 132):
        coord = coordinates[i]
        # query to get crimes at each location and time
        crime_types = crimeDB.getCrimeAtTimeAndLocation(weekday, hour, coord[0], coord[1])
        dangerrating = 0
        count = 0
        for crime in crime_types:
            dangerrating += (dangerVals[crime[0]])*crime[1]
            count += crime[1]
        if count != 0:
            ratings[i] = (dangerrating/count)
        else:
            ratings[i] = 0
    return ratings

# returns returns parents of each vertex in the SPT
# uses minDanger function to find the next vertex to visit in the intersections
def getSafestRoute(weekday, hour, start, dest):
    # dictionary that contains danger ratings for each vertex
    dangerRatings = getDangerRatings(weekday, hour)
    # print(dangerRatings)

    parent = [math.inf] * (11*12)
    danger = [math.inf] * (11*12)
    danger[start] = 0
    visited = [start]

    # run until we have visited dest
    while dest not in visited:

        # Pick the minimum distance vertex from
        # the set of vertices not yet processed.
        # v is parent of n, n is next vertex to visit
        v, n, minD = minDanger(danger, visited, dangerRatings)

        # Put the minimum distance vertex in the
        # shotest path tree
        visited.append(n)
        parent[n] = v
        danger[n] = minD

    return parent

# helper function used by getSafestRoute to get next vertex with the smallest
# danger
def minDanger(danger, visited, dangerRatings):
    adjacent = []
    minDanger = math.inf
    minIndex = None
    parent = None
    for v in visited:
        neighbors = intersections[v]
        for n in neighbors:
            if n not in visited:
                if minDanger > dangerRatings[n] + danger[v]:
                    minDanger = dangerRatings[n] + danger[v]
                    minIndex = n
                    parent = v
    return parent, minIndex, minDanger

# calls getSafestRoute to get parents in SPT and retreives the shortest path
# from start to dest
def safestpath(weekday, hour, start, dest):
    parents = getSafestRoute(weekday, hour, start, dest)
    path = [dest]
    child = dest
    while child != start:
        parent = parents[child]
        path.append(parent)
        child = parent
    path.reverse()
    return path

def getCrimeRatings(crime):
    ratings = []
    for c in crime:
        ratings.append([c[0],c[1],dangerVals[c[2]]])
    # print(ratings)
    return ratings

# test
# print(safestpath("Friday", 20, 79, 0))
