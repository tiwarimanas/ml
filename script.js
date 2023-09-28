// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// don't use below links:
// const URLm = "https://teachablemachine.withgoogle.com/models/6He_0q8_c/";
// const URLm = "https://teachablemachine.withgoogle.com/models/rRCA-SHQi/";

// the another great version with 200 epochs
// const URLm = "https://teachablemachine.withgoogle.com/models/dhoJb5nh5/"; 
// the below is the best versions with 1000 epochs
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
    "Healthy": `  <div class="card card-body rounded-4 my-2 border-0 fs-5 fw-bold animate__animated animate__fadeInDown">
               Healthy
              </div>
              <div class="card card-body rounded-4 my-2 bg-black animate__animated animate__fadeInDown" style="font-size:13px;">
                The fundus image you uploaded has been analyzed, and We pleased to inform you that it appears to be healthy.
                
                <span class="badge text-secondary" style="width:max-content;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Prediction Warning
                </span>
                  <span><a href="https://www.google.com/search?q=Healthy fundus image" class="btn btn-outline-warning rounded-4 my-2"><i class="fa-brands fa-google"></i>oogle it <i class="fa-solid fa-arrow-right"></i></a></span>

              </div>
            `,
    "Mild DR": ` <div class="card card-body rounded-4 my-2 border-0 fs-5 fw-bold animate__animated animate__fadeInDown">
               Mild DR
              </div>
              <div class="card card-body rounded-4 my-2 bg-black animate__animated animate__fadeInDown" style="font-size:13px;">
                <p>Mild Diabetic Retinopathy is an early stage of a diabetes-related eye condition called diabetic retinopathy. In this stage, small blood vessels in the retina, which is the light-sensitive tissue at the back of the eye, are damaged due to the effects of diabetes. This damage may result in tiny hemorrhages (microaneurysms) and the swelling of retinal blood vessels (macular edema).</p>

      <p>In terms of vision for a person suffering from mild diabetic retinopathy, they may not experience significant visual symptoms initially. However, over time, as the condition progresses, vision problems can develop. These may include:</p>
    <ul>
        <li>Blurred or fluctuating vision: Mild blurriness or occasional blurriness in vision can occur due to the early changes in the retina.</li>
        <li>Difficulty focusing: The ability to focus on objects, especially close-up, may be affected.</li>
        <li>Dark or empty areas in vision: Some individuals may notice small dark spots or gaps in their field of vision, which can result from microaneurysms or small hemorrhages.</li>
        <li>Reduced night vision: It may become harder to see in low-light conditions.</li>
        <li>Color vision changes: Colors may appear faded or less vibrant.</li>
    </ul>

    <p>It's important to note that mild diabetic retinopathy can progress to more severe stages if not managed properly. Regular eye examinations with an eye specialist (ophthalmologist) are essential for early detection and appropriate management. Tight control of blood sugar levels and other diabetes-related factors can help slow the progression of the condition and reduce the risk of vision loss.</p>

              <span class="badge text-secondary" style="width:max-content;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Prediction Warning
                </span>
                  <span><a href="https://www.google.com/search?q=Mild DR" class="btn btn-outline-warning rounded-4 my-2"><i class="fa-brands fa-google"></i>oogle it <i class="fa-solid fa-arrow-right"></i></a></span>

              </div>
                `,
    "Moderate DR": ` <div class="card card-body rounded-4 my-2 border-0 fs-5 fw-bold animate__animated animate__fadeInDown">
               Moderate DR
              </div>
              <div class="card card-body rounded-4 my-2 bg-black animate__animated animate__fadeInDown" style="font-size:13px;">
                
                <p>Moderate Diabetic Retinopathy is an intermediate stage of diabetic retinopathy, a diabetes-related eye condition. In this stage, the damage to the blood vessels in the retina becomes more pronounced compared to the mild stage. The blood vessels may become blocked or leak more severely.</p>

      <p>As diabetic retinopathy progresses to the moderate stage, individuals may experience more noticeable vision changes. The vision problems associated with moderate diabetic retinopathy include:</p>
    <ul>
        <li>Blurred vision: Blurriness in vision becomes more significant due to increased retinal damage.</li>
        <li>Floaters: Small specks or dark spots may appear to float in the field of vision.</li>
        <li>Difficulty reading or seeing fine details: The ability to read or see small details may be impaired.</li>
        <li>Partial vision loss: Some areas of the visual field may become distorted or obscured.</li>
        <li>Impaired color vision: Colors may appear faded or distorted.</li>
    </ul>

    <p>It's crucial for individuals with moderate diabetic retinopathy to seek prompt medical attention from an eye specialist (ophthalmologist). Treatment options may include laser therapy or injections to manage retinal swelling and prevent further vision deterioration. Additionally, maintaining tight control of blood sugar levels and other diabetes-related factors is essential to slow the progression of the condition and protect vision.</p>

                
                <span class="badge text-secondary" style="width:max-content;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Prediction Warning
                </span>
                  <span><a href="https://www.google.com/search?q=Moderate DR" class="btn btn-outline-warning rounded-4 my-2"><i class="fa-brands fa-google"></i>oogle it <i class="fa-solid fa-arrow-right"></i></a></span>

              </div>
                      `,
    "Proliferate ...": `  <div class="card card-body rounded-4 my-2 border-0 fs-5 fw-bold animate__animated animate__fadeInDown">
               Proliferate DR
              </div>
              <div class="card card-body rounded-4 my-2 bg-black animate__animated animate__fadeInDown" style="font-size:13px;">
                
                <p>Proliferative Diabetic Retinopathy is an advanced and severe stage of diabetic retinopathy, a diabetes-related eye condition. In this stage, there is widespread damage to the blood vessels in the retina, and new, fragile blood vessels begin to grow on the surface of the retina. These new blood vessels are weak and prone to bleeding, leading to potentially serious vision problems.</p>
<p>Proliferative Diabetic Retinopathy can have significant and potentially devastating effects on vision. Vision problems associated with proliferative diabetic retinopathy may include:</p>
    <ul>
        <li>Severe visual impairment: Vision loss can be profound, making it difficult to see clearly or even navigate daily tasks.</li>
        <li>Floaters and flashes of light: Due to bleeding and retinal damage, individuals may experience sudden flashes of light and numerous floaters in their field of vision.</li>
        <li>Partial or total blindness: In severe cases, proliferative diabetic retinopathy can lead to partial or total blindness if left untreated.</li>
        <li>Distorted vision: Straight lines may appear wavy or distorted due to the abnormal growth of blood vessels on the retina.</li>
        <li>Dark or empty areas in vision: Vision may have significant gaps or dark spots due to retinal hemorrhages.</li>
    </ul>
     <p>Immediate medical attention from an eye specialist (ophthalmologist) is crucial for individuals with proliferative diabetic retinopathy. Treatment options may include laser therapy or surgery to seal or remove abnormal blood vessels, along with other interventions to manage complications. Strict control of blood sugar levels and other diabetes-related factors is essential to prevent further damage and protect vision.</p>

               <span class="badge text-secondary" style="width:max-content;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Prediction Warning
                </span>
                  <span><a href="https://www.google.com/search?q=Proliferate DR" class="btn btn-outline-warning rounded-4 my-2"><i class="fa-brands fa-google"></i>oogle it <i class="fa-solid fa-arrow-right"></i></a></span>

              </div>
                        `,
    "Severe DR": `<div class="card card-body rounded-4 my-2 border-0 fs-5 fw-bold animate__animated animate__fadeInDown">
               Severe DR
              </div>
              <div class="card card-body rounded-4 my-2 bg-black animate__animated animate__fadeInDown" style="font-size:13px;">
                
                 <p>Severe Diabetic Retinopathy is an advanced and critical stage of diabetic retinopathy, a diabetes-related eye condition. In this stage, there is extensive and severe damage to the blood vessels in the retina. This damage can lead to a variety of serious complications that can significantly impact vision and overall eye health.</p>
<p>Severe Diabetic Retinopathy can cause profound and often irreversible vision problems. Vision issues associated with severe diabetic retinopathy may include:</p>
    <ul>
        <li>Severe visual impairment: Vision loss can be extensive, making it extremely challenging to see and perform daily tasks.</li>
        <li>Blindness: In some cases, severe diabetic retinopathy can result in total blindness if left untreated.</li>
        <li>Extensive bleeding in the eye: Severe retinal damage can lead to extensive bleeding within the eye, causing sudden and severe vision changes.</li>
        <li>Retinal detachment: The retina may become detached from the back of the eye, leading to severe visual distortion and loss.</li>
        <li>Glaucoma: Severe diabetic retinopathy can increase the risk of developing glaucoma, which can further worsen vision.</li>
    </ul>

    <p>Immediate and urgent medical attention from an eye specialist (ophthalmologist) is crucial for individuals with severe diabetic retinopathy. Treatment options may include surgery to repair retinal detachment, laser therapy to address bleeding and abnormal blood vessels, and other interventions to manage complications. Strict control of blood sugar levels and other diabetes-related factors is essential to prevent further damage and protect any remaining vision.</p>

                <span class="badge text-secondary" style="width:max-content;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Prediction Warning
                </span>
                  <span><a href="https://www.google.com/search?q=Severe DR" class="btn btn-outline-warning rounded-4 my-2"><i class="fa-brands fa-google"></i>oogle it <i class="fa-solid fa-arrow-right"></i></a></span>

              </div>
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
        if (prediction[i].probability > 0.50) {
            if (data[className]) {
                console.log(data[className]);
                typeText(data[className]);
            }else{
                typeText("Something went wrong, The Analysis Could not be displayed! No big Problem. See the prediction percentage on right.");
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
