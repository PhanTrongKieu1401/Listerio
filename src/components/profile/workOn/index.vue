<template>
  <div class="ml-8">
  <div class="flex justify-between mt-14">
    <div>
      <h3 class="text-base font-semibold">Worked on</h3>
    </div>
    <div>
      <Button type="link">View all</Button>
    </div>
  </div>
  <p class="text-xs text-slate-400">Others will only see what they can access</p>
  <div class="work-history bg-white p-4 rounded shadow mt-6 border border-gray-200">


    <ul class="list-none p-0">
      <li v-for="item in workItems" :key="item.id" class="flex items-center my-2 checkBox">
        <Checkbox class="mr-2" checked />
        <div class="flex flex-col">
          <span class="text-sm text-slate-600">{{ item.name }}</span>
          <span class="text-sm text-slate-400">{{ item.timeCreate }}</span>
        </div>

      </li>
    </ul>

  </div>
</div>
</template>

<script>
import { Checkbox, Button } from 'ant-design-vue';

export default {
  components: {
    Checkbox,
    Button
  },
  data() {
    return {
      workItems: [
        { id: 1, name: '456', timeCreate: 'Created on July 10, 2024' },
        { id: 2, name: 'haha', timeCreate: 'Created on July 10, 2024' },
        { id: 3, name: 'create', timeCreate: 'Created on July 10, 2024' },
        { id: 4, name: '123', timeCreate: 'Created on July 10, 2024' }
      ]
    };
  }
}
</script>
<style scoped>
@import "index.scss";
</style>