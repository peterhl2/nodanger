# Contains the crime type and its associated danger value
intersections = {}
coordinates = {}

lengthDiff = 0.00318
startLat = 40.116264
startLng = -88.208665
numWidth = 11
numHeight = 12

for i in range(0, numWidth):
    for j in range(0, numHeight):
        index = j+i*numHeight
        lat = startLat - i*lengthDiff
        lng = startLng - j*lengthDiff
        coordinates[index] = [lat, lng]
        routes = []
        if index-1 > (i-1)*numHeight+numWidth:
            routes.append(index-1)
        if index+1 < (i+1)*numHeight:
            routes.append(index+1)
        if index-numHeight >= 0:
            routes.append(index-numHeight)
        if index+numHeight <= 131:
            routes.append(index+numHeight)

        intersections[index] = routes

# print(coordinates)
# print("\n\n")
# print(intersections)
