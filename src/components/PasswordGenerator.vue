<template>
  <div id="pass-gen-component">
    <section>
      <h3 class="text-center text-light-gray mb-6">Password Generator</h3>
    </section>
    <!-- Password output with copy icon -->
    <section class="generator-section">
      <div class="flex flex-row justify-between">
        <p :class="[passwordCreated? 'text-white':'text-gray','overflow-x-clip']">{{password}}</p>
        <div v-on:click.prevent="showCopyModal" class="copy-icon pl-2">
          <svg  width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#A4FFAF" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.8333 15.6333V19.1333C19.8333 23.8 17.9667 25.6667 13.3 25.6667H8.86666C4.19999 25.6667 2.33333 23.8 2.33333 19.1333V14.7C2.33333 10.0333 4.19999 8.16666 8.86666 8.16666H12.3667"
                 stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.8333 15.6333H16.1C13.3 15.6333 12.3667 14.7 12.3667 11.9V8.16666L19.8333 15.6333Z"
                   stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.5333 2.33334H18.2" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M8.16667 5.83334C8.16667 3.89668 9.73001 2.33334 11.6667 2.33334H14.7233"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.6667 9.33334V16.555C25.6667 18.3633 24.1967 19.8333 22.3883 19.8333"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.6667 9.33334H22.1667C19.5417 9.33334 18.6667 8.45834 18.6667 5.83334V2.33334L25.6667 9.33334Z"
                   stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
    <!-- Main settings panel -->
    <section class="generator-section">
      <div>
        <!-- Password length info -->
        <div class="flex flex-row justify-between items-center">
          <p class="text-sm">Character length</p>
          <p class="text-light-green text-3xl font-bold">{{passwordLength}}</p>
        </div>
        <!-- Password length slider -->
        <div class="slider-container relative">
          <input class="slider w-full" type="range" v-model="passwordLength" min="4" max="40" step="1">
          <input class="slider-thumb-m" type="range" v-model="passwordLength" min="4" max="40" step="1">
        </div>
        <!-- Password components checkboxes -->
        <div class="pw-settings-checkbox">
          <div class="checkbox-input-container">
            <label class="checkbox-input">
              <input v-model="addUpperLetters" type="checkbox" :checked="addUpperLetters">
              <span>Include Uppercase Letters</span>
            </label>
          </div>
          <div class="checkbox-input-container">
            <label class="checkbox-input">
              <input v-model="addLowerLetters" class="" type="checkbox" :checked="addLowerLetters">
              <span>Include Lowercase Letters</span>
            </label>
          </div>
          <div class="checkbox-input-container">
            <label class="checkbox-input">
              <input v-model="addNumbers" class="" type="checkbox" :checked="addNumbers">
              <span>Include Numbers</span>
            </label>
          </div>
          <div class="checkbox-input-container">
            <label class="checkbox-input">
              <input v-model="addSymbols" class="" type="checkbox" :checked="addSymbols">
              <span>Include Symbols</span>
            </label>
          </div>
        </div>
        <!-- Lower panel showing password strength -->
        <div class="flex flex-row justify-between rounded bg-dark-gray-500 py-3 my-4">
          <p class="text-gray ml-3 uppercase">Strength</p>
          <div class="flex flex-row">
            <p class="mr-3 uppercase">{{ passwordDifficulty }}</p>
            <!-- Password strength indicators -->
            <div class="flex flex-row justify-between mr-3 diff-ind-container">
              <div :class="[n <= passwordScore? 'str-indicator-filled': 'str-indicator','diff-ind-item']" v-for="n in 4" v-bind:key="n">
                <div ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Generate password button -->
        <div class="flex flex-col justify-center ">
          <button v-on:click.prevent="generate" class="generate-btn">
            <p class="text-dark-gray-400 font-bold mr-3">Generate</p>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.8225 4.44751L15.375 9.00001L10.8225 13.5525" stroke="#18171F" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.625 9H15.2475" stroke="#18171F" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>

  <transition name="copy-modal-bar">
    <CopiedModal v-if="copyModal" :set-module-visible="true" @closed="copyModal = false"/>
  </transition>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import './PasswordGenerator.scss'
import './Modal.scss'
import CopiedModal from "@/components/CopiedModule.vue";
import {generatePassword, PasswordSettings} from "@/passwordGenerator";

function GetPasswordDifficulty(score: number) {
  switch (score){
    case 1: return 'MINIMAL';
    case 2: return 'LOW';
    case 3: return 'NORMAL';
    case 4: return 'HIGH';
  }
  return 'NONE';
}

export default defineComponent({
  name: 'PasswordGenerator',
  components: {CopiedModal},
  data() {
    return {
      password: 'Y3@fR5$r',
      passwordLength: 4,
      addUpperLetters: false,
      addLowerLetters: true,
      addNumbers: false,
      addSymbols: true,
      copyModal: false,
      passwordDifficulty: 'NONE',
      passwordScore: 0,
      passwordCreated: false,
    }
  },
  methods: {
    showCopyModal: function (){
      navigator.clipboard.writeText(this.password);
      this.copyModal = !this.copyModal;
    },
    generate: function () {
      const settings = new PasswordSettings();
      settings.length = this.passwordLength;
      settings.uppercase = this.addUpperLetters;
      settings.lowercase = this.addLowerLetters;
      settings.numbers = this.addNumbers;
      settings.symbols = this.addSymbols;
      const generatedString = generatePassword(settings);
      this.password = generatedString.password;
      this.passwordScore = generatedString.score;
      this.passwordDifficulty = GetPasswordDifficulty(this.passwordScore);
      this.passwordCreated = true;
    }
  }
})
</script>

<style scoped>
#pass-gen-component{
  @apply flex flex-grow flex-col items-center max-w-[92%] sm:max-w-[67%] md:max-w-[56%] lg:max-w-[42%] xl:max-w-[28%];
}
.generator-section{
  @apply bg-dark-gray-400 rounded p-4 w-full my-2;
}
.generator-item{
  @apply my-2;
}
.diff-ind-item{
  @apply mr-1 last:mr-0;
}
.diff-ind-container>.diff-ind-item{
  @apply rounded;
}
.diff-ind-container>.str-indicator-filled:nth-child(1){
  @apply bg-amber-300;
}
.diff-ind-container>.str-indicator-filled:nth-child(2){
  @apply bg-amber-300;
}
.diff-ind-container>.str-indicator-filled:nth-child(3){
  @apply bg-amber-300;
}
.diff-ind-container>.str-indicator-filled:nth-child(4){
  @apply bg-amber-300;
}
.str-indicator{
  @apply w-[12px] h-[28px] border-solid border-2 border-white rounded;
}
.str-indicator-filled{
  @apply w-[12px] h-[28px] border-none  rounded;
}


.pw-settings-checkbox{

}
.checkbox-input-container{
  @apply flex flex-row;
}
.checkbox-input>input{
  @apply absolute opacity-0 -z-10;
}
.checkbox-input>span{
  display: inline-flex;
  align-items: center;
  user-select: none;
}

.pw-checkbox-label input:checked::before{
}

.pw-checkbox-label{
  @apply ml-2;
}

.checkbox-input>span::before{
   content: '';
   @apply inline-block w-4 h-4 border-solid border-2 border-white rounded-sm bg-transparent mr-2;
   background-repeat: no-repeat;
   background-position: center center;
   background-size: 50% 50%;
   flex-shrink: 0;
   flex-grow: 0;
 }

.checkbox-input>input:checked+span {
  @apply text-white;
}

.checkbox-input>span{
  @apply text-light-gray text-sm;
  transition: 0.8s ease-out;
}

/* стили для чекбокса, находящегося в фокусе */
.checkbox-input>input:focus+span::before {
  @apply drop-shadow-md;
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.checkbox-input>input:focus:not(:checked)+span::before {
  @apply drop-shadow-md;
}

.checkbox-input>input:checked+span::before {
  @apply border-none bg-light-green;
  background-image: url("../assets/checked-icon.svg");
}

.checkbox-input>input:disabled+span::before {
  background-color: #e9ecef;
}

.generate-btn{
  @apply flex flex-row justify-center items-center w-full h-full py-3;
}
</style>