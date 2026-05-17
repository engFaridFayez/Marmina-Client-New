<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
import router from "@/router";

const authStore = useAuthStore();
const toast = useToast();

const user = computed(() => authStore.selectedUser);

const form = reactive({
  full_name: user.value?.full_name || "",
  email: user.value?.email || "",
  phone: user.value?.phone || "",
  whatsapp: user.value?.whatsapp || "",
  parent_phone: user.value?.parent_phone || "",
  address: user.value?.address || "",
  father: user.value?.father || "",
  slogan: user.value?.slogan || "",
  birth_date: user.value?.birth_date || "",
  image: null as File | null,
});
onMounted(async () => {
  await authStore.fetchUser();
  const u = authStore.user;
  if (u) {
    form.full_name = u.full_name || "";
    form.email = u.email || "";
    form.phone = u.phone || "";
    form.whatsapp = u.whatsapp || "";
    form.parent_phone = u.parent_phone || "";
    form.address = u.address || "";
    form.father = u.father || "";
    form.slogan = u.slogan || "";
    form.birth_date = u.birth_date || "";
  }
});

const handleImage = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files[0]) {
    form.image = target.files[0];
  }
};

const submit = async () => {
  const formData = new FormData();
  formData.append("full_name", form.full_name);
  formData.append("email", form.email);
  formData.append("phone", form.phone);
  formData.append("whatsapp", form.whatsapp);
  formData.append("parent_phone", form.parent_phone);
  formData.append("address", form.address);
  formData.append("father", form.father);
  formData.append("slogan", form.slogan);
  formData.append("birth_date", form.birth_date);
  if (form.image) formData.append("image", form.image);

  await authStore.editOwnData(formData);

  if (!authStore.error) {
    await authStore.fetchUser();
    toast.success("تم تحديث البيانات بنجاح ✨");
    router.push("/profile");
  } else {
    toast.error("حدث خطأ أثناء التحديث");
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 py-10 px-4"
    dir="rtl"
  >
    <div
      class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
    >
      <!-- Header -->
      <div class="bg-linear-to-r from-indigo-600 to-violet-600 p-8 text-white">
        <h1 class="text-3xl font-black">تعديل البيانات الشخصية</h1>
        <p class="mt-2 text-white/80">يمكنك تحديث بياناتك الشخصية بسهولة</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <!-- Full Name -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">الاسم بالكامل</label>
          <input
            v-model="form.full_name"
            type="text"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">البريد الإلكتروني</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Phone -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">رقم الهاتف</label>
          <input
            v-model="form.phone"
            type="text"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- WhatsApp -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">واتساب</label>
          <input
            v-model="form.whatsapp"
            type="text"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Parent Phone -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">رقم ولي الأمر</label>
          <input
            v-model="form.parent_phone"
            type="text"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Father -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">الأب الكاهن</label>
          <input
            v-model="form.father"
            type="text"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Birth Date -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">تاريخ الميلاد</label>
          <input
            v-model="form.birth_date"
            type="date"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Image -->
        <div class="space-y-2">
          <label class="font-bold text-slate-700">الصورة الشخصية</label>
          <input
            type="file"
            @change="handleImage"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 bg-white"
          />
        </div>

        <!-- Address -->
        <div class="space-y-2 md:col-span-2">
          <label class="font-bold text-slate-700">العنوان</label>
          <textarea
            v-model="form.address"
            rows="3"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          ></textarea>
        </div>

        <!-- Slogan -->
        <div class="space-y-2 md:col-span-2">
          <label class="font-bold text-slate-700">الشعار</label>
          <textarea
            v-model="form.slogan"
            rows="3"
            class="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          ></textarea>
        </div>

        <!-- Submit -->
        <div class="md:col-span-2">
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 py-4 text-lg font-bold text-white hover:scale-[1.01] transition disabled:opacity-50"
          >
            {{ authStore.loading ? "جاري تحديث البيانات..." : "حفظ التعديلات" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
