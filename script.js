// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
// const URLm = "https://teachablemachine.withgoogle.com/models/6He_0q8_c/";
// const URLm = "https://teachablemachine.withgoogle.com/models/rRCA-SHQi/";
const URLm = "https://teachablemachine.withgoogle.com/models/AG1gex57q/";
const sbtn = document.getElementById("sbtn");
const classbox = document.getElementById("classbox");
let imgin = document.getElementById('input-image');
let model, webcam, labelContainer, maxPredictions;

let ftest = 0;
// Load the image model and setup the webcam
async function init() {
    sbtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`;

    if (ftest == 0) {
        ftest = 1;
        const modelURL = URLm + "model.json";
        const metadataURL = URLm + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        labelContainer = document.getElementById("label-container");

        const colors = ['text-bg-success', 'text-bg-primary', 'text-bg-danger', 'text-bg-warning', 'text-bg-secondary'];

        for (let i = 0; i < maxPredictions; i++) {
            const newDiv = document.createElement("div");
            const colorIndex = i % colors.length;
            newDiv.innerHTML =
                ` 
            <span>result</span>
            <br>
            <div class="${colors[colorIndex]} rounded-3 p-1 my-1 text-end" style="height:30px;"></div>
            `;
            labelContainer.appendChild(newDiv).querySelector;
        }
    }
    await predict();
    sbtn.innerHTML = `Predict <i class="fa-brands fa-stumbleupon-circle text-warning"></i>`;


}

// async function loop() {
//     // webcam.update(); // update the webcam frame
//     await predict();
//     window.requestAnimationFrame(loop);
// }

const data = {
    "Normal": `   <h5 class="text-warning fw-bolder animate__animated animate__fadeInUp">Normal</h5>

                <h6 class="animate__animated animate__fadeInDown">Image Analysis Results:</h6>
                <p  class="animate__animated animate__fadeInDown">The machine learning model has analyzed the fundus image of the eye and determined that it appears to be normal.</p>

                <h6 class="animate__animated animate__fadeInDown">About Normal Eye Health:</h6>
                <p  class="animate__animated animate__fadeInDown">A normal fundus image indicates that the eye is currently free from significant abnormalities or eye conditions. However, regular eye check-ups are still recommended to monitor your eye health and catch any potential issues early.</p>

                <h6 class="animate__animated animate__fadeInDown">Important Note:</h6>
                <p  class="animate__animated animate__fadeInDown">Please bear in mind that the model's prediction is experimental and in an early stage. While it can identify normal appearances, it might also make mistakes. Regular consultations with a qualified eye care professional are crucial for maintaining your eye health.</p>

            `,
    "Cataract": `<h5 class="text-warning fw-bolder animate__animated animate__fadeInUp">Cataract</h5>

                <h6>Image Analysis Results:</h6>
                <p>The machine learning model has predicted that the fundus image of the eye appears to show signs of Cataract.</p>

                <h6>About Cataract:</h6>
                <p>Cataract is a condition characterized by the clouding of the lens in the eye, leading to blurry vision and reduced visual clarity. It's a common age-related condition but can also be caused by other factors.</p>

                <h6>Important Note:</h6>
                <p>Keep in mind that the model's prediction is in an experimental and early stage. There is a possibility of incorrect predictions. If you suspect any issues with your eyesight, it's important to seek guidance from a qualified medical professional for proper examination and diagnosis.</p>

                `,
    "Glaucoma": `<h5 class="text-warning fw-bolder animate__animated animate__fadeInUp">Glaucoma</h5>

                <h6 class="animate__animated animate__fadeInDown">Image Analysis Results:</h6>
                <p class="animate__animated animate__fadeInDown">The machine learning model has predicted that the fundus image of the eye appears to show signs of Glaucoma.</p>
                
                <h6 class="animate__animated animate__fadeInDown">About Glaucoma:</h6>
                <p  class="animate__animated animate__fadeInDown">Glaucoma is an eye condition that damages the optic nerve, often due to high intraocular pressure. It can lead to vision loss and even blindness if left untreated.</p>
                
                <h6 class="animate__animated animate__fadeInDown">Important Note:</h6>
                <p  class="animate__animated animate__fadeInDown">Please remember that the model's prediction is experimental and in an early stage. It is possible for the model to make incorrect predictions. If you suspect any eye-related issues, it's crucial to consult a qualified medical professional for a thorough examination and diagnosis.</p>
                `,
    "Diabetic Retinopathy": `<h5 class="text-warning fw-bolder animate__animated animate__fadeInUp">Diabetic Retinopathy</h5>

                            <h6 class="animate__animated animate__fadeInDown">Image Analysis Results:</h6>
                            <p  class="animate__animated animate__fadeInDown">The machine learning model has predicted that the fundus image of the eye appears to show signs of Diabetic Retinopathy.</p>

                            <h6 class="animate__animated animate__fadeInDown">About Diabetic Retinopathy:</h6>
                            <p  class="animate__animated animate__fadeInDown">Diabetic Retinopathy is a diabetes-related eye condition that damages blood vessels in the retina. It can lead to vision impairment and blindness if not managed properly.</p>

                            <h6 class="animate__animated animate__fadeInDown">Important Note:</h6>
                            <p  class="animate__animated animate__fadeInDown">Please be aware that the model's prediction is experimental and in an early stage. Mistakes can occur in its predictions. If you suspect any eye-related issues, it is essential to consult a qualified medical professional for a comprehensive evaluation and accurate diagnosis.</p>
                        `
    // Add more class information as needed
};

async function predict() {
    const flip = true;
    const maxPredictions = model.getTotalClasses();
    const prediction = await model.predict(imgin, flip);

    for (let i = 0; i < maxPredictions; i++) {
        const percent = (prediction[i].probability * 100).toFixed(0);
        const className = prediction[i].className;

        labelContainer.childNodes[i].querySelector("span").innerHTML = className;
        labelContainer.childNodes[i].querySelector("div").style.width = percent + '%';

        if (percent < 50) {
            labelContainer.childNodes[i].querySelector("div").innerHTML = "";
        } else {
            labelContainer.childNodes[i].querySelector("div").innerHTML = percent + '%';
        }

        console.log(prediction[i]);

        // Check if the prediction is more than 66% confident
        if (prediction[i].probability > 0.66) {
            if (data[className]) {
                console.log(data[className]);
                typeText(data[className]);
            } else{
                typeText(data["Diabetic Retinopathy"]);
            }

            classbox.innerHTML = className;
        }
    }
};


// let text = `
//     Based on the  retinal <b>Super</b> examination, our machine learning model has detected potential signs of diabetes. While this is a useful tool, it's important to remember that it's not a definitive diagnosis. We recommend consulting a medical professional for a comprehensive evaluation and further tests. Early detection and proper management are key to maintaining your health.
//     `;

// let charIndex = 0;
function typeText(text) {

    const typingContainer = document.getElementById("typing-text");
    typingContainer.innerHTML = text;
    // if (charIndex < text.length) {
    //   typingContainer.innerHTML += text.charAt(charIndex);
    //   charIndex++;
    //   setTimeout(typeText, 1);
    // }
};


// other image select handling code
const imageInput = document.getElementById('image-input');
const imgtag = document.getElementById('input-image');

imageInput.addEventListener('change', (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
        const imageUrl = URL.createObjectURL(selectedImage);
        imgtag.src = imageUrl;
    }
});