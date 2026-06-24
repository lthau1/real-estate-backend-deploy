<template>
  <section
    class="relative w-full px-4 py-16 sm:px-6 lg:px-[70px]"
    :style="{
      background: `linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)), url(${CONTACT_BG}) center/cover no-repeat`,
    }"
    aria-labelledby="contact-heading"
  >
    <div
      class="mx-auto flex w-full max-w-[1088px] flex-col-reverse items-center justify-between gap-10 lg:flex-row lg:gap-12"
    >
      <!-- Form card -->
      <Card
        class="w-full max-w-[416px] rounded-xl border-0 bg-navy shadow-none"
      >
        <CardContent class="flex flex-col gap-5 p-6 sm:p-8 lg:p-10">
          <div class="flex flex-col gap-4">
            <h2
              id="contact-heading"
              class="font-gantari text-2xl font-bold text-white"
            >
              Get in touch
            </h2>
            <p
              class="font-inter text-base font-normal leading-relaxed text-white/90"
            >
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus
            </p>
          </div>

          <!-- Success toast -->
          <div
            v-if="submitSuccess"
            class="rounded-md bg-green-500/20 border border-green-400/30 px-4 py-3 font-inter text-sm text-white"
          >
            ✓ Message sent! We will get back to you soon.
          </div>

          <!-- Error toast -->
          <div
            v-if="submitError"
            class="rounded-md bg-red-500/20 border border-red-400/30 px-4 py-3 font-inter text-sm text-white"
          >
            ✗ {{ submitError }}
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <div v-for="field in formFields" :key="field.id">
              <label :for="field.id" class="sr-only">{{
                field.placeholder
              }}</label>
              <Input
                :id="field.id"
                :type="field.type"
                v-model="formData[field.id as keyof typeof formData]"
                :placeholder="field.placeholder"
                :required="field.required"
                class="h-[50px] rounded-md border-0 bg-white px-4 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue"
              />
            </div>

            <div>
              <label for="message" class="sr-only">Your message</label>
              <Textarea
                id="message"
                v-model="formData.message"
                placeholder="Your message"
                required
                class="min-h-[130px] resize-none rounded-md border-0 bg-white px-4 py-3 font-inter text-base text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-blue"
              />
            </div>

            <Button
              type="submit"
              :disabled="isPending"
              class="h-[50px] w-full max-w-[200px] rounded-md bg-brand-blue font-gantari text-lg font-medium text-white hover:bg-brand-blue/90 disabled:opacity-60"
            >
              {{ isPending ? "Sending..." : "Send message" }}
            </Button>
          </form>
        </CardContent>
      </Card>

      <!-- Right text -->
      <div
        class="flex w-full max-w-[415px] flex-col items-start gap-6 lg:gap-8"
      >
        <h3
          class="font-gantari text-[32px] font-bold leading-[42px] text-white sm:text-[40px] sm:leading-[50px]"
        >
          Putting a plan to action,
          <br />
          to assure your satisfaction!
        </h3>
        <p
          class="font-inter text-base font-normal leading-relaxed text-white/90"
        >
          Arcu laoreet malesuada nunc eget. Fermentum ut dui etiam aliquam
          habitant elit.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Input from "./ui/Input.vue";
import Textarea from "./ui/Textarea.vue";
import Button from "./ui/Button.vue";
import Card from "./ui/Card.vue";
import CardContent from "./ui/CardContent.vue";
import { useSubmitContact } from "../composables/useApi";

const CONTACT_BG = "https://picsum.photos/seed/realestate-contact/1440/900";

const formFields = [
  { id: "name", type: "text", placeholder: "Your name", required: true },
  { id: "email", type: "email", placeholder: "Your email", required: true },
  { id: "phone", type: "tel", placeholder: "Your phone", required: false },
];

const formData = reactive({ name: "", email: "", phone: "", message: "" });
const submitSuccess = ref(false);
const submitError = ref("");

const { mutate, isPending } = useSubmitContact();

function handleSubmit() {
  submitSuccess.value = false;
  submitError.value = "";

  // Client-side validation
  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.message.trim()
  ) {
    submitError.value = "Please fill in all required fields.";
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  if (!emailOk) {
    submitError.value = "Please enter a valid email address.";
    return;
  }

  mutate(
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    },
    {
      onSuccess: () => {
        submitSuccess.value = true;
        formData.name = "";
        formData.email = "";
        formData.phone = "";
        formData.message = "";
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
</script>
