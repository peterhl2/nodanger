import queries
from danger_values import dangerVals
from road_network import intersections
from road_network import coordinates
import math


crimeDB = queries.CrimeDB()

def getDangerRatings():
    ratings = {}
    for i in range(0, 132):
        coord = coordinates[i]
        crime_types = crimeDB.getCrimeAtTimeAndLocation("", "", coord[0], coord[1])
        dangerrating = 0
        count = 0
        for crime in crime_types:
            dangerrating += (dangerVals[crime[0]])*crime[1]
            count += crime[1]
        if count != 0:
            ratings[i] = dangerrating/count
        else:
            ratings[i] = 0
    return ratings

def getSafestRoute(start, dest):
    dangerRatings = getDangerRatings()
    parent = [math.inf] * (11*12)
    danger = [math.inf] * (11*12)
    danger[start] = 0
    visited = [start]

    while dest not in visited:

        # Pick the minimum distance vertex from
        # the set of vertices not yet processed.
        # u is always equal to src in first iteration
        v, n, minD = minDanger(danger, visited, dangerRatings)

        # Put the minimum distance vertex in the
        # shotest path tree
        visited.append(n)
        parent[n] = v
        danger[n] = minD
    return parent


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

def safestpath(start, dest):
    parents = getSafestRoute(start, dest)
    path = [dest]
    child = dest
    while child != start:
        parent = parents[child]
        path.append(parent)
        child = parent
    path.reverse()
    return path

print(safestpath(25, 131))
