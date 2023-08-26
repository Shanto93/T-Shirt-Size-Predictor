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
  console.log({ k, weight, height });
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
  console.log(nearestNeighbors);
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
  const predictedSize = knnPredict(k, height, weight, algorithm);

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

  Swal.fire({
    imageUrl: `./assets/${predictedSize}.png`,
    imageAlt: 'A tall image'
  })
  // Display the result
  document.getElementById("result").innerHTML = `
  
  
  `;
});

// const defaultValueClicked = () => {
//   heightElement.value = 176;
//   weightElement.value = 74.8;
//   kElement.value = 3;
//   algorithmElement.value = "0";
// };

{/* <img class="w-75 h-96 px-5" src="./assets/${predictedSize}.png" alt="${predictedSize} T-Shirt"></img> */}