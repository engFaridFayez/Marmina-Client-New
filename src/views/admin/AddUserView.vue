<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const toast = useToast();
const route = useRoute();

const stages = computed(() => authStore.stages);
const families = computed(() => authStore.families);

// Flatten all families from stages (since familiesusers/ returns [])
const allFamilies = computed(() => authStore.stages.flatMap((stage: any) => stage.families ?? []));

const filteredStages = computed(() => {
  // امين مرحلة: for now show all stages since user.family is null
  // Once backend assigns a family to the user, this will auto-restrict
  if (authStore.user?.role === "امين مرحلة") {
    const userStageId = authStore.user?.family?.stage?.id;
    if (userStageId) {
      return stages.value.filter((stage: any) => stage.id === userStageId);
    }
    // fallback: show all if no stage assigned yet
    return stages.value;
  }
  return stages.value;
});

const filteredFamilies = computed(() => {
  const all = allFamilies.value;

  if (authStore.user?.role === "امين اسرة") {
    const userFamilyId = authStore.user?.family?.id;
    return all.filter((f: any) => f.id === userFamilyId);
  }

  if (authStore.user?.role === "امين مرحلة") {
    const userStageId = authStore.user?.family?.stage?.id;
    if (userStageId) {
      return all.filter((f: any) => f.stage?.id === userStageId);
    }
    // fallback: show all families if no stage assigned
    return all;
  }

  return all;
});

const filteredFamiliesByStage = computed(() => {
  let base = filteredFamilies.value;
  if (form.stage) {
    base = base.filter((f: any) => f.stage?.id === Number(form.stage));
  }
  return base;
});

const fieldError = (field: string): string | null => {
  const err = authStore.error;
  if (!err || typeof err !== "object") return null;
  const messages = (err as Record<string, string[]>)[field];
  return messages?.[0] ?? null;
};

const form = reactive({
  username: "",
  full_name: "",
  password: "",
  confirm_password: "",
  address: "",
  phone: "",
  whatsapp: "",
  father: "",
  birth_date: "",
  joined_date: "",
  parent_phone: "",
  role: "",
  family: "" as string | number,
  stage: "" as string | number,
  slogan: "",
});

watch(
  () => form.stage,
  () => {
    form.family = "";
  },
);

const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  await Promise.all([authStore.getFamilies(), authStore.getStages()]);

  if (authStore.user?.role === "امين اسرة" && authStore.user?.family?.stage?.id) {
    form.stage = authStore.user.family.stage.id;
  }

  if (isEdit.value) {
    const id = Number(route.params.id);
    await authStore.getSignleUser(id);
    const user = authStore.selectedUser;

    if (user) {
      Object.assign(form, {
        username: user.username ?? "",
        full_name: user.full_name ?? "",
        address: user.address ?? "",
        phone: user.phone ?? "",
        whatsapp: user.whatsapp ?? "",
        father: user.father ?? "",
        birth_date: user.birth_date ?? "",
        joined_date: user.joined_date ?? "",
        parent_phone: user.parent_phone ?? "",
        role: user.role ?? "",
        family: user.family?.id ?? user.family ?? "",
        stage: user.family?.stage?.id ?? "",
        slogan: user.slogan ?? "",
      });
    }
  }
});

const submit = async () => {
  try {
    const data = new FormData();
    data.append("full_name", form.full_name);
    data.append("username", form.username);
    if (!isEdit.value || form.password) {
      data.append("password", form.password);
      data.append("confirm_password", form.confirm_password);
    }
    data.append("address", form.address);
    data.append("phone", form.phone);
    data.append("whatsapp", form.whatsapp);
    data.append("father", form.father);
    data.append("birth_date", form.birth_date);
    data.append("joined_date", form.joined_date);
    data.append("parent_phone", form.parent_phone);
    data.append("slogan", form.slogan);
    if (form.role) data.append("role", form.role);
    if (form.family) data.append("family", String(form.family));
    if (form.stage) data.append("stage", String(form.stage));

    if (isEdit.value) {
      await authStore.editUser(Number(route.params.id), data);
      toast.success("تم تعديل البيانات");
    } else {
      await authStore.addUser(data);
      toast.success("تم اضافة المخدوم");
    }
  } catch {
    toast.error("حدث خطأ أثناء الإضافة");
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 py-10 px-4"
    dir="rtl"
  >
    <div
      class="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200"
    >
      <!-- Header -->
      <div
        class="p-8 text-white"
        style="background-image: url(&quot;/src/assets/images/resBack.jpeg&quot;)"
      >
        <h1 class="text-3xl font-bold">
          {{ isEdit ? "تعديل مخدوم / خادم" : "إضافة مخدوم / خادم جديد" }}
        </h1>
        <p class="mt-2 text-indigo-100">
          {{ isEdit ? "تعديل بيانات" : "قم بإدخال بيانات المخدوم بشكل صحيح" }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Username -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700">Username <b class="text-red-500">*</b></label>
          <input
            v-model="form.username"
            type="text"
            placeholder="ادخل كود الشخص"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('username') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('username')" class="text-red-500 text-sm pr-1">
            {{ fieldError("username") }}
          </p>
        </div>

        <!-- Full Name -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700"
            >الاسم بالكامل <b class="text-red-500">*</b></label
          >
          <input
            v-model="form.full_name"
            type="text"
            placeholder="ادخل الاسم بالكامل"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('full_name') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('full_name')" class="text-red-500 text-sm pr-1">
            {{ fieldError("full_name") }}
          </p>
        </div>

        <!-- Password -->
        <div v-if="!isEdit" class="space-y-1">
          <label class="font-semibold text-slate-700"
            >كلمة السر <b class="text-red-500">*</b></label
          >
          <input
            v-model="form.password"
            type="password"
            placeholder="ادخل كلمة السر"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('password') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('password')" class="text-red-500 text-sm pr-1">
            {{ fieldError("password") }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div v-if="!isEdit" class="space-y-1">
          <label class="font-semibold text-slate-700"
            >تأكيد كلمة السر <b class="text-red-500">*</b></label
          >
          <input
            v-model="form.confirm_password"
            type="password"
            placeholder="ادخل كلمة السر مره اخري"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('confirm_password') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('confirm_password')" class="text-red-500 text-sm pr-1">
            {{ fieldError("confirm_password") }}
          </p>
        </div>

        <!-- Phone -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700"
            >رقم الهاتف <b class="text-red-500">*</b></label
          >
          <input
            v-model="form.phone"
            type="text"
            placeholder="01xxxxxxxxx"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('phone') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('phone')" class="text-red-500 text-sm pr-1">
            {{ fieldError("phone") }}
          </p>
        </div>

        <!-- WhatsApp -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700">رقم الواتساب</label>
          <input
            v-model="form.whatsapp"
            type="text"
            placeholder="01xxxxxxxxx"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('whatsapp') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('whatsapp')" class="text-red-500 text-sm pr-1">
            {{ fieldError("whatsapp") }}
          </p>
        </div>

        <!-- Father -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700">اسم الأب</label>
          <input
            v-model="form.father"
            type="text"
            placeholder="اسم الأب"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('father') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('father')" class="text-red-500 text-sm pr-1">
            {{ fieldError("father") }}
          </p>
        </div>

        <!-- Parent Phone -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700">رقم ولي الأمر</label>
          <input
            v-model="form.parent_phone"
            type="text"
            placeholder="01xxxxxxxxx"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('parent_phone') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('parent_phone')" class="text-red-500 text-sm pr-1">
            {{ fieldError("parent_phone") }}
          </p>
        </div>

        <!-- Birth Date -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700"
            >تاريخ الميلاد <b class="text-red-500">*</b></label
          >
          <input
            v-model="form.birth_date"
            type="date"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('birth_date') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('birth_date')" class="text-red-500 text-sm pr-1">
            {{ fieldError("birth_date") }}
          </p>
        </div>

        <!-- Joined Date -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700"
            >تاريخ الانضمام <b class="text-red-500">*</b></label
          >
          <input
            v-model="form.joined_date"
            type="date"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('joined_date') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          />
          <p v-if="fieldError('joined_date')" class="text-red-500 text-sm pr-1">
            {{ fieldError("joined_date") }}
          </p>
        </div>

        <!-- Role -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700"
            >خادم / مخدوم <b class="text-red-500">*</b></label
          >
          <select
            v-model="form.role"
            :class="[
              'w-full rounded-2xl border px-4 py-3 bg-white outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('role') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          >
            <option disabled value="">خادم / مخدوم</option>
            <option
              v-if="
                authStore.user?.role == 'امين اسرة' ||
                authStore.user?.role == 'امين الشمامسة' ||
                authStore.user?.role == 'admin'
              "
              value="مخدوم"
            >
              مخدوم
            </option>
            <option
              v-if="
                authStore.user?.role == 'امين مرحلة' ||
                authStore.user?.role == 'امين الشمامسة' ||
                authStore.user?.role == 'admin'
              "
              value="خادم عادي"
            >
              خادم
            </option>
            <option
              v-if="authStore.user?.role == 'امين الشمامسة' || authStore.user?.role == 'admin'"
              value="امين مرحلة"
            >
              امين مرحلة
            </option>
          </select>
          <p v-if="fieldError('role')" class="text-red-500 text-sm pr-1">
            {{ fieldError("role") }}
          </p>
        </div>

        <!-- Stage -->
        <div v-if="authStore.user?.role !== 'امين اسرة'" class="space-y-1">
          <label class="font-semibold text-slate-700">المرحلة <b class="text-red-500">*</b></label>
          <select
            v-model="form.stage"
            :class="[
              'w-full rounded-2xl border px-4 py-3 bg-white outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('stage') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          >
            <option disabled value="">اختر المرحلة</option>
            <option v-for="stage in filteredStages" :key="stage.id" :value="stage.id">
              {{ stage.name }}
            </option>
            <option v-if="authStore.user?.role === 'امين اسرة'">
              {{ authStore.user.family?.name }}
            </option>
          </select>
          <p v-if="fieldError('stage')" class="text-red-500 text-sm pr-1">
            {{ fieldError("stage") }}
          </p>
        </div>

        <!-- Family -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700">الأسرة</label>
          <select
            v-model="form.family"
            :class="[
              'w-full rounded-2xl border px-4 py-3 bg-white outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition',
              fieldError('family') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          >
            <option disabled value="">اختر الأسرة</option>
            <option v-for="family in filteredFamiliesByStage" :key="family.id" :value="family.id">
              {{ family.name }}
            </option>
            <option v-if="authStore.user?.role === 'امين اسرة'" :value="authStore.user.family?.id">
              {{ authStore.user.family?.name }}
            </option>
          </select>
          <p v-if="fieldError('family')" class="text-red-500 text-sm pr-1">
            {{ fieldError("family") }}
          </p>
        </div>

        <!-- Slogan -->
        <div class="space-y-1">
          <label class="font-semibold text-slate-700">ال slogan</label>
          <input
            v-model="form.slogan"
            type="text"
            placeholder="ال slogan"
            class="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"
          />
        </div>

        <!-- Address -->
        <div class="md:col-span-2 space-y-1">
          <label class="font-semibold text-slate-700">العنوان</label>
          <textarea
            v-model="form.address"
            rows="4"
            placeholder="ادخل العنوان بالكامل"
            :class="[
              'w-full rounded-2xl border px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition resize-none',
              fieldError('address') ? 'border-red-400 bg-red-50' : 'border-slate-300',
            ]"
          ></textarea>
          <p v-if="fieldError('address')" class="text-red-500 text-sm pr-1">
            {{ fieldError("address") }}
          </p>
        </div>

        <!-- Button -->
        <div class="md:col-span-2 pt-4">
          <button
            type="submit"
            class="w-full hover:scale-[1.01] active:scale-[0.99] text-white font-bold py-4 rounded-2xl shadow-lg transition duration-300 cursor-pointer"
            style="background-image: url(&quot;/src/assets/images/resBack.jpeg&quot;)"
          >
            {{ isEdit ? "تعديل" : "إضافة" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
