<template>
  <div v-if="props.isVisible"
    class="fixed inset-x-0 flex items-start justify-center bg-opacity-50 transition-opacity duration-300 ease-in-out">
    <div class="bg-white w-[320px] shadow-lg border rounded border-gray-500 border-opacity-20 p-0 relative">

      <div>
        <a-anchor ref="anchor" direction="horizontal" 
          :items="items" @change="handleAnchorChange"
          class="flex font-ui text-sm font-medium text-text-dark justify-start mt-2 mx-3 cursor-pointer" />
      </div>

      <div class="border-b border-black opacity-20 mb-0"></div>

      <div v-if="false" class="min-h-[100px] flex items-center text-center mx-6 font-apple text-sm font-normal">
        <span v-if="currentTab === 'assigned'">You have no open issues assigned to you</span>
        <span v-if="currentTab === 'recent'">Recent activity will be shown here</span>
        <span v-if="currentTab === 'boards'">Board related information will be shown here</span>
      </div>

      <div v-else class="mt-3 mb-1" v-for="(task, status) in tasks" :key="status">
        <div class="pl-5 mb-1">
          <span class="text-xm font-medium font-ui text-text-dark text-xs">{{task[0]}} </span>
        </div>
        <ul class="w-full ">
          <li v-for="(item, index) in task[1]" :key="index" class="h-[50px]  w-full bg-white text-text-dark-thin text-sm font-ui font-normal  hover:bg-gray-200 hover:bg-opacity-80 pl-4 flex items-center cursor-pointer">
            <div class="flex h-[20px] py-4">
              <div class="flex items-center cursor-pointer ">
                <i class="fa-solid fa-square-check text-blue-400 ml-1 fa-lg text-2xl"></i>
                <div class="ml-3">
                  <div>
                    <span class="text-sm font-ui text-text-dark-thin">{{item.title}}</span>
                  </div>
                  <div>
                    <span class="text-xs font-ui text-text-dark">{{item.keyProjectTask}}</span>
                    
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="border-b border-black opacity-20 mb-0"></div>

      <div class="w-full mt-1">
        <button
          class="w-full h-10 bg-white text-text-dark-thin text-sm font-ui font-normal mb-2 hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">
          Go to work page
        </button>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { getAllTaskAssigneesForUser } from "../../../../api/task";

export interface Task {
  id: string;
  title: string;
  point: number;
  status: string;
  keyProjectTask: string;
  sprintId: string;
}

// Định nghĩa các props
const props = defineProps<{
  isVisible: boolean;
}>();

// Các biến trạng thái
const currentTab = ref('assigned'); // Default tab is 'assigned'
const anchor = ref(null);
const tasks = ref<Map<string, Task[]>>(new Map());

const items = ref([
  {
    key: 'assigned',
    href: '#assigned',
    title: 'Assigned to me',
  },
  {
    key: 'recent',
    href: '#recent',
    title: 'Recent',
  },
  {
    key: 'boards',
    href: '#boards',
    title: 'Boards',
  },
]);

const handleAnchorChange = (event: any) => {
  const anchor = event || '';
  const key = anchor.replace('#', '');
  setTab(key);
};

const setTab = (tab: string) => {
  currentTab.value = tab;
};

onMounted(async () => {
  await nextTick();
  // const anchorElement = anchor.value as HTMLElement;
  // if (anchorElement) {
  //   const assignedTab = anchorElement.querySelector('[href="#assigned"]');
  //   if (assignedTab) {
  //     (assignedTab as HTMLElement).click();
  //   }
  // }
  try {
    const response = await getAllTaskAssigneesForUser();

    const filteredTasks: any[] = response.data.filter((task: any) => task.status);
    
    // Định nghĩa thứ tự trạng thái mong muốn
    const statusOrder = ['TODO', 'IN_PROGRESS', 'READY_FOR_TEST', 'DONE'];
    
    // Sắp xếp các task theo thứ tự trạng thái
    const sortedTasks = filteredTasks.sort((a, b) => {
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });

    const map = new Map<string, Task[]>();
    sortedTasks.forEach((task) => {
      if (!map.has(task.status)) {
        map.set(task.status, []);
      }
      map.get(task.status)!.push(task);
    });

    tasks.value = map;
    console.log("tasks: ", tasks.value);
  } catch (error) {
    console.error(error);
  }
});
</script>
