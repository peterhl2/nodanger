# k-means clusters for different based on cooridnates
# to show which areas are the mmost dangerous
# k = 5
from sklearn.cluster import KMeans
import numpy as np
import queries
import math
from road_network import intersections
from road_network import coordinates
from danger_values import dangerVals

crimeDB = queries.CrimeDB()
crime = {}
crimeCoords = []

def dist(node, center):
    return np.linalg.norm(np.array(node)-np.array(center))

#TODO: runs k-means clustering to get the cluster centers of dangerous places
def getDangerClusters():
    kmeans = KMeans(n_clusters=5).fit(np.array(crimeCoords))
    labels = kmeans.predict(crimeCoords)
    # print(labels)
    cluster_centers = kmeans.cluster_centers_
    return cluster_centers, labels


# TODO: using the cluster centers get the nearest danger nodes on Map
def getDangerNodes(user):
    parseData(user)
    centers, labels = getDangerClusters()
    nearestNodes = []
    for c in centers:
        minDist = math.inf
        nearestNode = None
        for node in coordinates:
            d = dist(coordinates[node], c)
            if minDist > d:
                minDist = d
                nearestNode = node
        nearestNodes.append(nearestNode)

    return getDangerValues(nearestNodes, labels)

def getDangerValues(nodes, labels):
    counts = [0] * 5
    dangers = [0] * 5
    response = []

    i = 0
    for c in crime:
        dangers[labels[i]] += dangerVals[crime[c]]
        counts[labels[i]] += 1
        i += 1

    for d in range(0, len(dangers)):
        print(d)
        if counts[d] != 0:
            dangers[d] /= counts[d]
            response.append({nodes[d]:dangers[d]})
        else:
            dangers[d] = 0
            response.append({nodes[d]:dangers[d]})
    return response

def parseData(user):
    queries.user = user
    crimes = crimeDB.getCrimeAtTimeOfLogin()
    for c in crimes:
        if c[0] != "" or c[1] != "":
            lat = float(c[0])
            lng = float(c[1])

            crime[(lat, lng)] = c[2]
            crimeCoords.append([lat,lng])

    return

#test
# print(getDangerNodes("peter"))
