<template>
  <section class="flex w-full justify-center px-4 py-10 sm:px-6 lg:px-8">
    <div class="w-full max-w-[1296px]">
      <div
        class="grid min-h-[580px] grid-cols-1 items-center gap-10 overflow-hidden rounded-[20px] px-8 py-12 sm:px-10 lg:grid-cols-[1fr_416px] lg:gap-[90px] lg:px-[110px] lg:py-[90px]"
        :style="{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundPosition: '50% 50%',
          backgroundSize: 'cover',
        }"
      >
        <!-- Left: contact info -->
        <div class="flex flex-col items-start justify-center gap-8">
          <header class="flex flex-col items-start gap-4">
            <h1
              class="font-gantari text-[36px] font-bold leading-tight text-black sm:text-[40px]"
            >
              Feel free to
              <br />
              contact us
            </h1>
            <p
              class="max-w-[282px] font-inter text-base font-normal leading-relaxed text-black"
            >
              Leo morbi faucibus mattis pharetra
            </p>
          </header>

          <address class="not-italic">
            <div class="flex flex-col gap-5">
              <div
                v-for="{ icon, content, isMultiLine } in contactDetails"
                :key="content"
                class="flex items-start gap-3"
              >
                <component
                  :is="icon"
                  class="mt-0.5 h-5 w-5 shrink-0 text-navy"
                />
                <span
                  :class="!isMultiLine ? 'whitespace-nowrap' : ''"
                  class="font-inter text-lg font-semibold leading-7 text-navy"
                  v-html="content"
                />
              </div>
            </div>
          </address>
        </div>

        <!-- Right: form card -->
        <Card
          class="w-full max-w-[416px] justify-self-end rounded-xl border-0 bg-navy shadow-none lg:w-[416px]"
        >
          <CardContent class="flex flex-col items-start gap-5 p-8 lg:p-10">
            <header class="flex w-full flex-col gap-4">
              <h2 class="font-gantari text-2xl font-bold text-white">
                Get in touch
              </h2>
              <p
                class="font-inter text-base font-normal leading-relaxed text-white/80"
              >
                Leo morbi faucibus mattis pharetra tellus velit ultricies duis
                rhoncus
              </p>
            </header>

            <!-- Success -->
            <p
              v-if="submitSuccess"
              class="w-full rounded-md bg-brand-green/20 px-4 py-2 font-inter text-sm font-medium text-white"
            >
              ✓ Message sent! We will get back to you soon.
            </p>

            <!-- Error -->
            <p
              v-if="submitError"
              class="w-full rounded-md bg-red-500/20 px-4 py-2 font-inter text-sm font-medium text-white"
            >
              ✗ {{ submitError }}
            </p>

            <form
              class="flex w-full flex-col gap-4"
              @submit.prevent="handleSubmit"
            >
              <div>
                <label for="contact-name" class="sr-only">Your name</label>
                <Input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your name"
                  required
                  class="h-[50px] border-0 bg-white px-4 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
                />
              </div>

              <div>
                <label for="contact-email" class="sr-only">Your mail</label>
                <Input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  placeholder="Your mail"
                  required
                  class="h-[50px] border-0 bg-white px-4 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
                />
              </div>

              <div>
                <label for="contact-phone" class="sr-only">Your phone</label>
                <Input
                  id="contact-phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="Your phone"
                  class="h-[50px] border-0 bg-white px-4 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
                />
              </div>

              <div>
                <label for="contact-message" class="sr-only"
                  >Your message</label
                >
                <Textarea
                  id="contact-message"
                  v-model="form.message"
                  placeholder="Your message"
                  required
                  class="min-h-[148px] resize-none border-0 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
                />
              </div>

              <Button
                type="submit"
                :disabled="isPending"
                class="h-[50px] w-[180px] rounded-md bg-brand-blue font-gantari text-lg font-medium text-white hover:bg-brand-blue/90 disabled:opacity-60"
              >
                {{ isPending ? "Sending..." : "Send message" }}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw } from "vue";
import { MapPin, Phone, Mail } from "lucide-vue-next";
import Card from "./ui/Card.vue";
import CardContent from "./ui/CardContent.vue";
import Input from "./ui/Input.vue";
import Textarea from "./ui/Textarea.vue";
import Button from "./ui/Button.vue";
import { useSubmitContact } from "../composables/useApi";

const HERO_IMAGE = "https://picsum.photos/seed/contact-hero/1296/813";

const form = reactive({ name: "", email: "", phone: "", message: "" });
const submitSuccess = ref(false);
const submitError = ref("");

const { mutate, isPending } = useSubmitContact();

function handleSubmit() {
  submitSuccess.value = false;
  submitError.value = "";

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    submitError.value = "Please fill in all required fields.";
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  if (!emailOk) {
    submitError.value = "Please enter a valid email address.";
    return;
  }

  mutate(
    {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    },
    {
      onSuccess: () => {
        submitSuccess.value = true;
        form.name = "";
        form.email = "";
        form.phone = "";
        form.message = "";
        setTimeout(() => {
          submitSuccess.value = false;
        }, 5000);
      },
      onError: (err: Error) => {
        submitError.value =
          err.message || "Something went wrong. Please try again.";
      },
    },
  );
}

const contactDetails = [
  {
    icon: markRaw(MapPin),
    content: "8911 Tanglewood Ave.<br />Capitol Heights, MD 20743",
    isMultiLine: true,
  },
  { icon: markRaw(Phone), content: "(566) 237-4687", isMultiLine: false },
  { icon: markRaw(Phone), content: "(239) 319-8083", isMultiLine: false },
  { icon: markRaw(Mail), content: "moinefou@hotmail.com", isMultiLine: false },
];
</script>
