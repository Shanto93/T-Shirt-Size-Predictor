const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");
const kElement = document.getElementById("kvalue");
const algorithmElement = document.getElementById("algorithm");

function euclideanDistance(dataPoint1, dataPoint2) {
  const heightDiff = dataPoint1.height - dataPoint2.height;
  const weightDiff = dataPoint1.weight - dataPoint2.weight;
  return Math.sqrt(heightDiff * heightDiff + weightDiff * weightDiff);
}
function manhattanDistance(point1, point2) {
  return (
    Math.abs(point1.height - point2.height) +
    Math.abs(point1.weight - point2.weight)
  );
}

function knnPredict(k, height, weight, algorithm) {
  const inputHeight = parseFloat(height);
  const inputweight = parseFloat(weight);
  let distances = [];
  for (const dataPoint of dataset) {
    let distance = null;
    if (algorithm === "0") {
      distance = euclideanDistance(dataPoint, {
        height: inputHeight,
        weight: inputweight,
      });
    } else {
      distance = manhattanDistance(dataPoint, {
        height: inputHeight,
        weight: inputweight,
      });
    }
    distances.push({ distance, size: dataPoint.size });
  }
  distances.sort((a, b) => a.distance - b.distance);
  const nearestNeighbors = distances.slice(0, k);
  let sizeCounts = {};
  nearestNeighbors.forEach((point) => {
    sizeCounts[point.size] = (sizeCounts[point.size] || 0) + 1;
  });

  // Find the size with the most occurrences
  const predictedSize = Object.keys(sizeCounts).reduce((a, b) =>
    sizeCounts[a] > sizeCounts[b] ? a : b
  );
  return predictedSize;
}

// Handle the prediction when the button is clicked
document.getElementById("tshirt-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const height = parseFloat(heightElement.value);
  const weight = parseFloat(weightElement.value);
  const k = parseInt(kElement.value);
  const algorithm = algorithmElement.value;
  
  if(k<1 || height < 1  || weight <1)
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please,provide valid information',
    })
    return;
  }
  if(k % 2 == 0)
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'K should be an odd number.',
    })
    return;
  }

  const predictedSize = knnPredict(k, height, weight, algorithm);
  Swal.fire({
    imageUrl: `./assets/${predictedSize}.png`,
    imageAlt: `T-shirt size is ${predictedSize}`,
  })
});