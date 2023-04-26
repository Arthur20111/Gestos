Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("captura").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1nEVsFeOu/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        document.getElementById("resultado").innerHTML = results[0].label;

        gesture = results[0].label;

        toSpeak = "";

        if (gesture == "Boca") {
            toSpeak = "Fale com a minha mão";
            document.getElementById("icone").innerHTML = " &#129295;";
        }
        else if (gesture == "Paz e amor") {
            toSpeak = "Nada como paz e amor na vida";
            document.getElementById("icone").innerHTML = "&#9996;";
        }
        else if (gesture == "Joinha") {
            toSpeak = "Tá de boa? Tá beleza";
            document.getElementById("icone").innerHTML = "&#128077;";
        }
       
        speak();
    }
}


function speak() {
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}