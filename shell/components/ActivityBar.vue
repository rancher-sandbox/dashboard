<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'ActivityBar',
  data() {
    return { isExpanded: false };
  },
  methods: {
    menuClick() {
      this.isExpanded = !this.isExpanded;
    }
  },
});
</script>

<template>
  <div
    class="activity-bar"
    :class="{
      'activity-bar-expanded': isExpanded,
      'activity-bar-collapsed': !isExpanded
    }"
  >
    <div class="menu">
      <div
        class="menu-container"
        @click="menuClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </div>
    </div>
    <div class="body">
      <div class="activity">
        <div class="activity-icon">
          <span class="icon icon-2x icon-info"></span>
        </div>
        <span
          v-if="isExpanded"
          class="activity-text"
        >Rancher Desktop</span>
      </div>
      <div class="activity">
        <div class="activity-icon active">
          <span class="icon icon-2x icon-warning"></span>
        </div>
        <span
          v-if="isExpanded"
          class="activity-text active"
        >Dashboard</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .activity-bar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: var(--primary-900) 0% 0% no-repeat padding-box;
    box-shadow: 4px 3px 6px #00000029;
    opacity: 1;
    z-index: 99;
    padding: 0 0.75rem;
    width: 100%;
    transition: width 0.25s ease;
    overflow: hidden;

    &.activity-bar-expanded {
      width: 16rem;
    }

    &.activity-bar-collapsed {
      width: 100%;
    }

    .menu {
      display: flex;
      padding: 0.75rem 0;

      .menu-container {
        fill: var(--darker-text);
        color: var(--darker-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 36px;
        min-height: 36px;
        opacity: 1;

        .menu-icon {
          color: var(--darker-text);
          min-width: 24px;
          min-height: 24px;
        }
      }

    }

    .body {
      display: flex;
      gap: 1rem;
      flex-direction: column;

      .activity {
        display: flex;
        gap: 1rem;
        align-items: center;
        cursor: pointer;

        &:hover {
          .activity-icon {
            color: var(--primary-hover-text);
            border-color: var(--primary-hover-text);
          }

          .activity-text {
            color: var(--primary-hover-text);
          }
        }

        .activity-text {
          color: #BCBCBC;
          flex-shrink: 0;

          &.active {
            color: var(--darker-text);
          }
        }

        .activity-icon {
          &.active {
            border: 1px solid var(--activity-icon-active-background);
            background-color: var(--activity-icon-active-background);
            color: var(--activity-icon-color);
          }

          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          min-height: 36px;
          border: 1px solid #BCBCBC;
          color: #BCBCBC;
          border-radius: 8px;
          opacity: 1;
        }
      }
    }
  }
</style>
