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
    "Healthy": `   <p>We have not found any signs of Diabetic Retinopathy (DR) in the fundus photo. It appears to be healthy.</p>
                    <ul>
                        <li>Prediction: <span class="text-warning fw-bolder">Healthy</span></li>
                    </ul>
            `,
    "Mild DR": `<p>We have detected signs of mild Diabetic Retinopathy (DR) in your fundus photo.</p>
                    <p>Additional Information about Mild DR:</p>
                    <ul>
                        <li>Prediction: <span class="text-warning fw-bolder">Mild DR</span></li>
                        <li>Mild DR is an early stage of diabetic retinopathy where small blood vessels in the retina start to show damage.</li>
                        <li>Early detection and management are crucial in preventing the progression of DR to more severe stages.</li>
                        <li>Regular eye check-ups and diabetes control are recommended to monitor and manage the condition.</li>
                    </ul>
                    <p>If you have any questions or need further information or guidance regarding mild DR, please feel free to contact us.</p>

                `,
    "Moderate DR": `
                    <p>We have detected signs of moderate Diabetic Retinopathy (DR) in your fundus photo.</p>
                    <p>Additional Information about Moderate DR:</p>
                    <ul>
                        <li>Prediction: <span class="text-warning fw-bolder">Moderate DR</span></li>
                        <li>Moderate DR is an advanced stage of diabetic retinopathy where blood vessels in the retina become more damaged.</li>
                        <li>Timely intervention is crucial at this stage to prevent further vision loss.</li>
                        <li>Treatment options may include laser therapy or injections to manage the condition.</li>
                        <li>It's essential to consult with an eye specialist for proper evaluation and treatment.</li>
                    </ul>
                    <p>If you have any questions or need further information or guidance regarding moderate DR, please feel free to contact us.</p>

                      `,
    "Proliferate DR": `
                            <p>We have detected signs of proliferative Diabetic Retinopathy (DR) in your fundus photo.</p>
                            <p>Additional Information about Proliferative DR:</p>
                            <ul>
                                <li>Prediction: <span class="text-warning fw-bolder">Proliferate DR</span></li>
                                <li>Proliferative DR is an advanced stage of diabetic retinopathy characterized by the growth of abnormal blood vessels in the retina.</li>
                                <li>It is a severe condition that can lead to vision loss if left untreated.</li>
                                <li>Treatment options may include laser surgery or injections to prevent the progression of the disease.</li>
                                <li>Immediate consultation with an eye specialist is critical to preserve your vision.</li>
                            </ul>
                            <p>If you have any questions or need further information or guidance regarding proliferative DR, please feel free to contact us.</p>

                        `,
    "Severe DR": `
                    <p>We have detected signs of severe Diabetic Retinopathy (DR) in your fundus photo.</p>
                    <p>Additional Information about Severe DR:</p>
                    <ul>
                        <li>Prediction: <span class="text-warning fw-bolder">Severe DR</span></li>
                        <li>Severe DR is an advanced stage of diabetic retinopathy where extensive damage to blood vessels in the retina has occurred.</li>
                        <li>It poses a high risk of vision loss and complications like retinal detachment.</li>
                        <li>Prompt and intensive medical treatment, such as surgery or injections, is typically required.</li>
                        <li>Immediate consultation with an eye specialist is crucial to address this condition effectively.</li>
                    </ul>
                    <p>If you have any questions or need further information or guidance regarding severe DR, please feel free to contact us.</p>

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
                typeText("Something went wrong, Try Again!");
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