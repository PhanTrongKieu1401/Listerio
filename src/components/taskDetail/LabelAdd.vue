<template>
  <template v-for="(tag, index) in state.tags" :key="tag">
    <a-tooltip v-if="tag.length > 20" :title="tag">
      <a-tag :closable="index !== -1" @close="handleClose(tag)">
        {{ `${tag.slice(0, 20)}...` }}
      </a-tag>
    </a-tooltip>
    <a-tag v-else :closable="index !== -1" @close="handleClose(tag)">
      {{ tag }}
    </a-tag>
  </template>
  <a-input
    v-if="state.inputVisible"
    ref="inputRef"
    v-model:value="state.inputValue"
    type="text"
    size="small"
    :style="{ width: '78px' }"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <a-tag
    v-else
    style="background: #fff; border-style: dashed"
    @click="showInput"
  >
    <plus-outlined />
    New
  </a-tag>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const inputRef = ref();
const state = reactive({
  tags: ["Label 1", "Label 2", "Label 3"],
  inputVisible: false,
  inputValue: "",
});

const handleClose = (removedTag: string) => {
  const tags = state.tags.filter((tag) => tag !== removedTag);
  console.log(tags);
  state.tags = tags;
};

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  let tags = state.tags;
  if (inputValue && tags.indexOf(inputValue) === -1) {
    tags = [...tags, inputValue];
  }
  console.log(tags);
  Object.assign(state, {
    tags,
    inputVisible: false,
    inputValue: "",
  });
};
</script>
