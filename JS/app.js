'use strict';

let attemptsE1 = document.getElementById('attempts');
let container = document.getElementById('image-container')

let firstImage = document.getElementById('firstImg')
let secondImage = document.getElementById('secondImg')
let thirdImage = document.getElementById('thirdImg')

let result = document.getElementById('results');

let Img = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1;
let showImg = [];
let voteImage = [];
let viewImage = [];
let product = [];
let busNameImage = [];
function ProductImage(productName) {
    this.pName = productName.split('.')[0];
    this.imgPath = `Img/${productName}`;
    this.Votes = 0;
    this.Views = 0;
    product.push(this);
    busNameImage.push(this.pName);

}

for (let i = 0; i < Img.length; i++) {
    new ProductImage(Img[i])
}

// console.log(product);

function randomImage() {
    return Math.floor(Math.random() * Img.length) // 0 to 18 array lenght is 19
}

// let firstIndex;
// let secondIndex;
// let thirdIndex;
let firstIndex;
let scondIndex;
let thirdIndex;

function renderImg() {
    firstIndex = randomImage();
    scondIndex = randomImage();
    thirdIndex = randomImage();

    while (firstIndex === scondIndex || scondIndex == thirdIndex || firstIndex === thirdIndex || showImg.includes(firstIndex) || showImg.includes(scondIndex) || showImg.includes(thirdIndex)) {
        firstIndex = randomImage();
        scondIndex = randomImage();
        thirdIndex = randomImage();
    }
    firstImage.setAttribute('src', product[firstIndex].imgPath);
    secondImage.setAttribute('src', product[scondIndex].imgPath);
    thirdImage.setAttribute('src', product[thirdIndex].imgPath);
    product[firstIndex].Views++;
    product[scondIndex].Views++;
    product[thirdIndex].Views++;
    showImg[0]=firstIndex;
    showImg[1]=scondIndex;
    showImg[2]=thirdIndex;


}
renderImg();

firstImage.addEventListener('click', clickHandle);
secondImage.addEventListener('click', clickHandle)
thirdImage.addEventListener('click', clickHandle);

function clickHandle(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'firstImg') {
            product[firstIndex].Votes++;
        } else if (clickedImage === 'secondImg') {
            product[scondIndex].Votes++
        } else if (clickedImage === 'thirdImg') {
            product[thirdIndex].Votes++
        }
        renderImg();
        attempt++;
    }

    // else
    // {
    //     for (let i = 0; i < product.length; i++) 
    //     {
    //         let liEl = document.createElement('li');
    //         result.appendChild(liEl);
    //         liEl.textContent = `${product[i].pName} has ${product[i].Votes} votes and  ${product[i].Views} views.`;
    //     }
    // firstImage.removeEventListener('click', clickHandle)
    // secondImage.removeEventListener('click', clickHandle)
    // thirdImage.removeEventListener('click', clickHandle)
    // }

}

let btnEl = document.getElementById('btn');
btnEl.addEventListener('click', showResult)

function showResult(event) {
    for (let i = 0; i < product.length; i++) {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${product[i].pName} has ${product[i].Votes} votes and  ${product[i].Views} views.`;
        voteImage.push(product[i].Votes);
        viewImage.push(product[i].Views);
    }
    chartRender()

    btnEl.removeEventListener('click', showResult)
}
function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busNameImage,
            datasets: [{
                label: '# of Votes',
                data: voteImage,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: viewImage,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}