<template>
  <navbar />

  <!-- section 1 -->
  <section class="min-h-screen bg-gradient-to-b from-[#273758] to-[#0e1e42]">
    <section class="flex items-center justify-between h-[100vh] pt-[10vh] gap-4">

      <div class="pl-20 flex flex-col space-y-3 font-charlie-display text-white ml-">
        <h1 class="text-5xl font-medium">
          Move fast, stay aligned, and build better - together
        </h1>
        <p class="text-xl opacity-80 font-charlie-display">
          The #1 software development tool used by agile teams
        </p>
        <button v-if="isProject" @click="handelGoProject()"
          class="px-1 h-12 font-apple text-base font-medium bg-[#ffab00] border rounded border-transparent text-black hover:bg-[#e69a00]">
          Go to {{project?.title}}
        </button>
        <button v-else
          class="w-24 h-12 font-apple text-base font-medium bg-[#ffab00] border rounded border-transparent text-black hover:bg-[#e69a00]">
          Get it free
        </button>
      </div>

      <img class="w-[55%]" src="../../assets/img/Hero.png" alt="Hero">
    </section>
  </section>

  <!-- section 2 -->
  <section class="h-screen flex flex-col items-center pt-8 relative overflow-hidden bg-[#0e1e42]">
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0e1e42] to-[#1e46a4]"
        style="clip-path: polygon(66% 100%, 90% 90%,100% 50%, 100% 100%);"></div>
    </div>

    <h1 class="font-charlie-display text-4xl font-bold text-white mb-8 z-10">All from a single source of truth</h1>
    <div class="flex space-x-2 z-10">
      <button v-for="(tab, index) in tabs" :key="index" @click="changeTab(index)"
        :class="['font-charlie min-h-10 px-4 py-2 font-normal text-xl rounded-full relative transition-colors duration-300', activeTab === index ? 'text-[#0e1e52] bg-[#6ed8a1]' : 'text-white bg-[#283859]', 'hover:border-white']">
        {{ tab.label }}
        <span
          class="absolute inset-0 border-2 border-transparent rounded-full hover:border-white transition-colors duration-300"></span>
      </button>
    </div>

    <transition name="slide-fade" mode="out-in" class="z-10">
      <div class="flex justify-between gap-6 mt-10" :key="activeTab">
        <div class="w-[450px] text-white font-charlie-display ml-8 mt-10">
          <span class="font-bold text-3xl">{{ tabs[activeTab].label }}</span>
          <p class="text-xl mt-6 w-[400px]">{{ tabs[activeTab].description }}</p>
          <div class="py-4 mt-12 rounded-r-full flex flex-col space-y-2 bg-gradient-to-r from-[#0e1e42] to-[#2b64fb]">
            <i class="fa-solid fa-quote-left text-6xl"></i>
            <p class="text-white text-lg pl-2 font-medium font-apple w-[400px]">{{ tabs[activeTab].credentials.text }}
            </p>
            <div class="pl-2 opacity-90">
              <p class="font-bold font-charlie text-sm">{{ tabs[activeTab].credentials.username }}</p>
              <p class="text-xs font-charlie">{{ tabs[activeTab].credentials.company }}</p>
            </div>
          </div>
        </div>
        <img :key="tabs[activeTab].img" :src="resolveImagePath(tabs[activeTab].img)" alt="tab" class="w-[900px] mr-10">
      </div>
    </transition>
  </section>

  <!-- section 3 -->
  <section class="h-[130vh] relative">
    <div class="grid grid-cols-2 h-full">
      <div class="flex items-center justify-center bg-gradient-to-b from-[#0e1e42] to-[#1b2b4d]">
        <div class="flex flex-col  text-center mt-72 ">
          <h1 class="max-w-4/5 text-2xl font-semibold font-charlie-display text-white mb-4">Templates give you a head
            start</h1>
          <p class="max-w-4/5 text-white font-charlie-display mb-2">Get started with ready-made templates.</p>

          <div class="flex flex-col space-y-4 mt-8 border-2 border-transparent">
            <div v-for="template in templateList" :key="template.name"
              class="  min-h-24 min-w-[500px] flex items-center justify-center bg-[#273758] m-0 rounded-md">
              <div class="grid grid-cols-[100px,1fr] w-full h-full items-center">
                <div class="flex items-center justify-center bg-[#273758] m-0">
                  <img :src="resolveImagePath(template.img)" alt="template image" class="w-16 h-16">
                </div>
                <div class="bg-[#1b2b4e]  h-[100px] ">
                  <div class="flex flex-col items-start h-full ml-8 ">
                    <span class="text-white text-xl font-semibold font-charlie-display mt-6 mb-2 h-full ">{{
                      template.name }}</span>
                    <span
                      class="text-white text-base font-charlie mb-2 h-full flex z-10 hover:underline cursor-pointer ">
                      Learn more
                      <div class="text-xs mt-1 ml-2 ">
                        <i class="fa-solid fa-arrow-right"></i>
                      </div>
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#0e1e43] h-full flex items-center justify-center">
        <div class="flex flex-col s pace-y-2 items-center text-center mt-72">
          <h1 class="w-4/5 text-2xl font-semibold font-charlie-display text-white mb-6">Then customize as you grow</h1>
          <p class="w-4/5  text-white font-charlie-display mb-8">Jira adapts to the way you work, not the other way
            around. Start simple, customize as you go. </p>
          <img src="../../assets/img/workflow_img.png" alt="" class='w-2/3'>
        </div>
      </div>

    </div>

    <h1
      class="text-4xl font-semibold text-center absolute inset-0 mt-10 font-charlie-display justify-center text-white">
      Easier than ever
    </h1>

    <div class="h-2/5 flex items-center justify-center w-[55%] mx-auto mt-0 absolute inset-0">
      <img src="../../assets/img/document.svg" alt="document">
      <div class="flex-1 h-2 bg-gradient-to-r from-blue-600 to-green-300 mx-0"></div>
      <img src="../../assets/img/icon-workflow.svg" alt="workflow">
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import Navbar from '../../components/shared/Navbar/index.vue';
import { tabs_content, templates } from '../../constants/homeInfo';

const activeTab = ref(0);
const tabs = tabs_content;
const templateList = templates;
const router = useRouter();
const idProject = ref(localStorage.getItem('idProject') || null);
const isProject = ref(false)
const project = ref<{ id: string; title: string;} | null>(null);

const changeTab = (index: number) => {
  activeTab.value = index;
};

const loadProject = async () => {
  if(idProject.value === null) {
    isProject.value = false
    return
  }
  try {
    // const projectRoleStore = await useProjectRoleStore();
    // await projectRoleStore.loadProjectRole(idProject.value);
  
    // project.value = projectRoleStore.project
    // console.log("projectRoleStore", project)
    isProject.value = false
  } catch (error) {
    console.error("Error data:", error);
    isProject.value = false
  }
};

const handelGoProject = () => {
  router.push("/mainpage");
}
const resolveImagePath = (image: string) => {
  return new URL(image, import.meta.url).href;
};

onMounted(() => {
  loadProject();
});
</script>


<style scoped lang="scss">
@import 'index.scss';
</style>
