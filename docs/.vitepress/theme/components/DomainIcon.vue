<script setup lang="ts">
import { computed } from "vue";
import { domainIcons, type DomainIconName } from "../icons";

const props = withDefaults(defineProps<{
  name: DomainIconName;
  size?: number;
  label?: string;
}>(), {
  size: 24,
});

const icon = computed(() => domainIcons[props.name]);
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    role="img"
    :aria-label="props.label || icon.label"
  >
    <path v-for="path in icon.paths" :key="path" :d="path" />
  </svg>
</template>
