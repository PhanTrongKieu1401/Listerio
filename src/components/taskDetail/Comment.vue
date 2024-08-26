<template>
  <a-comment>
    <template #avatar>
      <a-avatar src="https://secure.gravatar.com/avatar/b135b1cb057c7e8230e8d0d5a3eba119?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FLH-4.png" alt="Han Solo" />
    </template>
    <template #content>
      <a-textarea v-model:value="value" :rows="4" allow-clear show-count :maxlength="100"/>
      <a-button class="mt-4" html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">Add Comment</a-button>
    </template>
  </a-comment>
  <a-list
    v-if="comments.length"
    :data-source="comments"
    :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
    item-layout="horizontal"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <div>
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        />
        <div>
          <button class="" type="button"><span class="css-1gd7hga">Edit</span></button>
          <button class="ml-4" type="button"><span class="css-1gd7hga">Delete</span></button>
        </div>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
export default {
  name: 'Comment',
};
</script>
<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type Comment = Record<string, string>;

const comments = ref<Comment[]>([]);
const submitting = ref<boolean>(false);
const value = ref<string>('');
const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  submitting.value = true;

  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: 'Han Solo',
        avatar: 'https://secure.gravatar.com/avatar/b135b1cb057c7e8230e8d0d5a3eba119?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FLH-4.png',
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = '';
  }, 1000);
};
</script>

