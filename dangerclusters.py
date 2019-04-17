# k-means clusters for different based on cooridnates
# to show which areas are the mmost dangerous
# k = 5
from sklearn.cluster import KMeans
import numpy as np
import random
import queries
import math
from scipy.spatial.distance import cdist
from road_network import intersections
from road_network import coordinates
from danger_values import dangerVals

crimeDB = queries.CrimeDB()
crime = {}
crimeCoords = []

k_ = 10

def dist(node, center):
    return np.linalg.norm(np.array(node)-np.array(center))

# runs k-means clustering to get the cluster centers of dangerous places
def getDangerClusters():
    kmeans = KMeans(n_clusters=k_).fit(np.array(crimeCoords))
    labels = kmeans.predict(crimeCoords)
    # print(labels)
    cluster_centers = kmeans.cluster_centers_
    # labels, cluster_centers = kMeans(np.array(crimeCoords), k_, 100)
    return cluster_centers, labels

def kMeans(data,K,niter):
    #Put your code here
    feat_vec = np.zeros(len(data))
    kmeans_idx = random.sample(range(len(data)), K)
    kmeans = data[kmeans_idx]
    # iterate niter times for "convergence"
    for i in range(niter):
        numInClusters = np.zeros(K)
        sumOfClusters = np.zeros((K,2))
        # label each feature with cluster
        for f in range(len(data)):
            distances = cdist([data[f]], kmeans)
            min_k = 0
            min_dist = distances[0][0]
            for d in range(0, len(distances[0])):
                if distances[0][d] < min_dist:
                    min_dist = distances[0][d]
                    min_k = d
            # assign near k_mean to feature, inc num in cluster, add feature to total
            feat_vec[f] = min_k
            numInClusters[min_k] += 1
            sumOfClusters[min_k] += data[f]
        # recompute averages for each cluster
        for c in range(K):
            kmeans[c][0] = (float)(sumOfClusters[c][0]/numInClusters[c])
            kmeans[c][1] = (float)(sumOfClusters[c][1]/numInClusters[c])
    return feat_vec, kmeans

# uses the cluster centers get the nearest danger nodes on Map
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
    counts = [0] * k_
    dangers = [0] * k_
    response = []

    i = 0
    # print(labels)
    for c in crime:
        dangers[int(labels[i])] += dangerVals[crime[c]]
        counts[int(labels[i])] += 1
        i += 1

    for d in range(0, len(dangers)):
        if counts[d] != 0:
            dangers[d] /= counts[d]
            response.append({"idx":nodes[d]})
            response[d]["value"] = dangers[d]
        else:
            dangers[d] = 0
            response.append({"idx":nodes[d]})
            response[d]["value"] = dangers[d]
            # {nodes[d]:dangers[d]})
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
