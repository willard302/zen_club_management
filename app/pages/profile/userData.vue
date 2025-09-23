<script setup lang="ts">
definePageMeta({ title: 'user_data' });
import type { PickerConfirmEventParams } from 'vant';
import globalCountry from '~/data/globalCountry';
const authStore = useAuthStore();
const router = useRouter();
const { updateUser } = useDataBase();
const { t } = useI18n();

const isDisabled = ref(true);
const showPickerGender = ref(false);
const showPickerCountry = ref(false);
const showPickerCity = ref(false);
const showPickerDate = ref(false);

const searchCountry = ref("");
const searchCity = ref("");
const pickerDate = ref<string[]>([]);

const countries = ref<typeof globalCountry>([]);
interface cityType {
  name: string;
  geo: string
}
const city = ref<cityType[]>([]);
const countryFieldName = {
  text: 'name',
  value: 'name',
  children: 'city'
}

const genderOptions = computed(() => {
  return [
    { text: t('male'), value: t('male') },
    { text: t('female'), value: t('female') },
  ]
});

const userHabits = computed({
  get: () => authStore.userInfo.habits?.join(', ') || '',
  set: (val: string) => {
    authStore.userInfo.habits = val.split(',').map(s => s.trim())
  }
});

const onSubmit = async () => {
  await updateUser(authStore.userId, authStore.userInfo);
  showSuccessToast({
    message: 'saved success!',
    onClose: () => router.push("/profile")
  });
};

const handleToggle = (action:string) => {
  switch(action) {
    case "gender":
      if (isDisabled.value === true) return;
      showPickerGender.value = !showPickerGender.value;
      break;
    case "date":
      if (isDisabled.value === true) return;
      showPickerDate.value = !showPickerDate.value;
    case "edit":
      isDisabled.value = !isDisabled.value;
      break;
    default:
      break;
  }
};

const onConfirmGender = ({ selectedValues }: PickerConfirmEventParams) => {
  showPickerGender.value = false;
  authStore.setUserInfo({'gender': selectedValues[0]?.toString()})
};

const onConfirmCountry = ({ selectedOptions }: PickerConfirmEventParams) => {
  showPickerCountry.value = false;
  authStore.setUserInfo({'birth_country': `${selectedOptions[0]?.name ?? ''}, ${selectedOptions[1]?.name ?? ''}`})
  searchCountry.value = '';
};

const onConfirmDate = ({ selectedValues }: any) => {
  authStore.setUserInfo({'birth': selectedValues.join('-')})
  pickerDate.value = selectedValues;
  showPickerDate.value = false;
};

const filterList = (list: any[], keyword: string) => {
  const key = keyword.toLowerCase();
  return list.filter(item => item.name.toLowerCase().includes(key));
}

const handleFilter = () => {
  if (showPickerCountry.value) {
    countries.value = globalCountry
    countries.value = filterList(countries.value, searchCountry.value)
  };

  if (showPickerCity.value) {
    city.value = filterList(city.value, searchCity.value)
  }
};

</script>

<template>
  <van-form @submit="onSubmit" :disabled="isDisabled">
    <van-cell-group inset>
      <Avatar></Avatar>
      <van-field
        v-model="authStore.userInfo.name"
        :label="$t('name')"
        :placeholder="$t('Hints.enter_name')"
      />
      <van-field
        is-link
        readonly
        v-model="authStore.userInfo.gender"
        :label="$t('gender')"
        :placeholder="$t('Hints.select_gender')"
        @click="handleToggle('gender')"
      />
      <van-popup
        v-model:show="showPickerGender"
        round
        position="bottom"
      >
        <van-picker
          :columns="genderOptions"
          @cancel="handleToggle('gender')"
          @confirm="onConfirmGender"
        />
      </van-popup>
      <van-field
        is-link
        readonly
        v-model="authStore.userInfo.birth"
        :label="$t('birthdate')"
        :placeholder="$t('Hints.select_birthdate')"
        @click="handleToggle('date')"
      />
      <van-popup
        v-model:show="showPickerDate"
        destroy-on-close
        round
        position="bottom"
      >
        <van-date-picker
          :model-value="pickerDate"
          @confirm="onConfirmDate"
          @cancel="showPickerDate = false"
        />
      </van-popup>
      <van-field
        v-model="userHabits"
        :label="$t('habit')"
        :placeholder="$t('Hints.enter_habit')"
      />
      <van-field
        is-link
        readonly
        v-model="authStore.userInfo.birth_country"
        :label="$t('country')"
        :placeholder="$t('Hints.select_country')"
        @click="showPickerCountry = true"
      />
      <van-popup
        v-model:show="showPickerCountry"
        round
        position="bottom"
      >
        <van-search
          v-model="searchCountry"
          :placeholder="$t('search')"
          @update:model-value="handleFilter"
        />
        <van-picker
          :columns="countries"
          :columns-field-names="countryFieldName"
          @confirm="onConfirmCountry"
          @cancel="showPickerCountry = false"
        />
      </van-popup>
    </van-cell-group>
    <van-space class="button__container">
      <van-button round block type="primary" @click="handleToggle('edit')">{{ isDisabled ? $t("edit") : $t("cancel") }}</van-button>
      <van-button v-if="!isDisabled" round block type="primary" native-type="submit">{{ $t('submit') }}</van-button>
    </van-space>
  </van-form>
</template>

<style scoped lang="scss">
.van-popup--bottom {
  max-height: 320px;

  >ul >li {
    text-align: center;
  }
}
.van-search {
  width: 100%;
  height: 44px;
  padding: 0 20px;
}

.button__container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;

  :deep(.van-space-item) {
    width: 45%
  };
}
</style>
