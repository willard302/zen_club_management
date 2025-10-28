<script setup lang="ts">
import { Locale } from 'vant';
import vantUS from 'vant/es/locale/lang/en-US';
import vantTW from 'vant/es/locale/lang/zh-TW';
import type { message } from '~/types/data.types';
const { setLocale, t } = useI18n();

const messages: message[] = [
  { text: t('locale.en'), value: 'en' },
  { text: t('locale.tw'), value: 'tw' }
];

const currentLocale = ref("tw");

watch(
  () => currentLocale.value,
  (newLocale) => {
    switch(newLocale) {
      case 'tw':
        setLocale('tw');
        Locale.use('zh-TW', vantTW);
        break;
      default:
        setLocale('en');
        Locale.use('en-US', vantUS);
        break;
    }
  }
)

</script>

<template>
  <van-dropdown-menu class="locale__select">
    <van-dropdown-item v-model="currentLocale" :options="messages" />
  </van-dropdown-menu>
</template>

<style scoped lang="scss">
.locale__select {
  padding: 0px 12px;
  appearance: none;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  --van-dropdown-menu-shadow: none
}
</style>
