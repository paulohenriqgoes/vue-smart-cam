<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import BoxHighlighter from './BoxHighlighter.vue';

type Prediction = {
  class: string,
  score: number
  bbox: number[]
}

// data
let model: any
const modelIsHealth = ref(false)
const videoRef = ref<HTMLVideoElement>()
const showEnableButton = ref(true) 
const mediaRecorder = ref<MediaRecorder>()
const predictions = ref<Prediction[]>()

// methods
function enableWebcam() {
  // Only continue if the COCO-SSD has finished loading.
  if (!modelIsHealth.value || !videoRef.value) {
    return
  }
  
  // Hide the button once clicked.
 showEnableButton.value = false
  
  // getUsermedia parameters to force video but not audio.
  const constraints = {
    video: true
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      videoRef.value.addEventListener('loadeddata', predictWebcam);
      mediaRecorder.value = new MediaRecorder(stream)
      mediaRecorder.value.start()
    }
  });
}

// Check if webcam access is supported.
function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

// Placeholder function for next step.
async function predictWebcam() {
  try {
    const result = await model?.detect(videoRef.value)

    predictions.value = result.filter((prdt: Prediction) => prdt.score > 0.46)

    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  } catch (err) {
    console.error('Error [model detect]:', err)
    window.alert('Algo errado não está certo!!')
  }
}

async function loadCocoSsdModel() {
  if (!window.cocoSsd) window.alert('cocoSsd not loaded!')

  return window.cocoSsd.load()
}

onMounted(async () => {
  if (!getUserMediaSupported()) window.alert('your browser don\'t have support to get user media!!')
  try {
    model = await loadCocoSsdModel()
    modelIsHealth.value = true
  } catch (error) {
    console.error(error)
    window.alert('Error on load cocoSsd model')
  }
})

onBeforeUnmount(() => {
  mediaRecorder.value?.stop()
})
</script>

<template>
  <h1>Multiple object detection using pre trained model in TensorFlow.js</h1>

  <p>Wait for the model to load before clicking the button to enable the webcam - at which point it will become visible to use.</p>

  <section v-show="modelIsHealth">

    <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "enable webcam" below and accept access to the webcam when the browser asks (check the top left of your window)</p>
    
    <div class="camView">
      <button v-if="showEnableButton" @click="enableWebcam">Enable Webcam</button>
      <div class="video-wrapper">
        <BoxHighlighter
          v-for="(prdt, $index) in predictions"
          :key="`${prdt.class}-${$index}`"
          :label="prdt.class"
          :score="prdt.score"
          :left="prdt.bbox[0]"
          :top="prdt.bbox[1]"
          :width="prdt.bbox[2]"
          :height="prdt.bbox[3]"
        />
        <video id="smart-cc" ref="videoRef" autoplay muted width="640" height="480"></video>
      </div>
    </div>
  </section>
</template>

<style scoped>
.camView {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.video-wrapper {
  cursor: pointer;
  position: relative;
  width: fit-content;
  height: fit-content;
}
</style>