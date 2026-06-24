<template>
  <Card class="w-full overflow-hidden rounded-xl border-0 bg-navy shadow-none">
    <CardContent class="flex flex-col items-start gap-5 p-6 md:p-10">
      <!-- Agent info -->
      <div class="flex w-full flex-col gap-4">
        <h2 class="font-gantari text-[28px] font-bold leading-5 text-white">
          Contact agent
        </h2>
        <div class="flex items-center gap-3">
          <img
            :src="agent.photo"
            :alt="agent.name"
            class="h-[60px] w-[60px] shrink-0 rounded-full object-cover"
          />
          <div class="flex flex-col gap-1.5">
            <p class="font-gantari text-base font-medium leading-5 text-white">
              {{ agent.name }}
            </p>
            <p class="font-gantari text-sm font-normal leading-5 text-white/80">
              {{ agent.phone }}
            </p>
            <p class="font-gantari text-sm font-normal leading-5 text-white/80">
              {{ agent.email }}
            </p>
          </div>
        </div>
      </div>

      <p v-if="submitted" class="w-full rounded-md bg-brand-green/20 px-4 py-2 font-inter text-sm font-medium text-white">
        Message sent! The agent will be in touch soon.
      </p>

      <form class="flex w-full flex-col gap-4" @submit="handleSubmit">
        <div>
          <label for="agent-name" class="sr-only">Your name</label>
          <Input
            id="agent-name"
            v-model="form.name"
            type="text"
            placeholder="Your name"
            required
            :class="inputCls"
          />
        </div>
        <div>
          <label for="agent-email" class="sr-only">Your mail</label>
          <Input
            id="agent-email"
            v-model="form.email"
            type="email"
            placeholder="Your mail"
            required
            :class="inputCls"
          />
        </div>
        <div>
          <label for="agent-phone" class="sr-only">Your phone</label>
          <Input
            id="agent-phone"
            v-model="form.phone"
            type="tel"
            placeholder="Your phone"
            :class="inputCls"
          />
        </div>
        <div>
          <label for="agent-message" class="sr-only">Your message</label>
          <Textarea
            id="agent-message"
            v-model="form.message"
            placeholder="Your message"
            required
            class="min-h-[148px] resize-none rounded-md border-0 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue shadow-none"
          />
        </div>
        <Button
          type="submit"
          class="h-[50px] w-[200px] rounded-md bg-brand-blue font-gantari text-lg font-medium text-white hover:bg-brand-blue/90"
        >
          Send message
        </Button>
      </form>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Card from './ui/Card.vue';
import CardContent from './ui/CardContent.vue';
import Input from './ui/Input.vue';
import Textarea from './ui/Textarea.vue';
import Button from './ui/Button.vue';

interface Agent {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

defineProps<{
  agent: Agent;
}>();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const submitted = ref(false);

const inputCls = 'h-[50px] rounded-md border-0 bg-white px-4 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue shadow-none';

function handleSubmit(e: Event) {
  e.preventDefault();
  submitted.value = true;
  form.name = '';
  form.email = '';
  form.phone = '';
  form.message = '';
}
</script>
