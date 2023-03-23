<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

// data
const model = ref<any>()
const modelIsHealth = ref(false)
const videoRef = ref<HTMLVideoElement>()
const showEnableButton = ref(true) 
const mediaRecorder = ref<MediaRecorder>()

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
function predictWebcam() {
}

async function loadCocoSsdModel() {
  if (!window.cocoSsd) window.alert('cocoSsd not loaded!')

  return window.cocoSsd.load()
}

onMounted(async () => {
  if (!getUserMediaSupported()) window.alert('your browser don\'t have support to get user media!!')
  try {
    model.value = await loadCocoSsdModel()
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
      <video ref="videoRef" autoplay muted width="640" height="480"></video>
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
</style>