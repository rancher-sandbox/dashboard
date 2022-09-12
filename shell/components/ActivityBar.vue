<template>
  <div class="activity-bar">
    <div class="menu">
      <svg
        class="menu-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </div>
    <div class="body">
      <div class="activity-icon">
        <span class="icon icon-2x icon-info"></span>
      </div>
      <div class="activity-icon active">
        <span class="icon icon-2x icon-warning"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .activity-bar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: #002C40 0% 0% no-repeat padding-box;
    width: 4rem;
    box-shadow: 4px 3px 6px #00000029;
    opacity: 1;
    z-index: 9;

    .menu {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 0;
      cursor: pointer;

      .menu-icon {
        width: 24px;
        height: 24px;
        fill: var(--darker-text);
      }
    }

    .body {
      display: flex;
      gap: 1rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .activity-icon {
        &.active {
          border: 1px solid #0181BE;
          background-color: #0181BE;
          color: var(--darker-text)
        }

        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: 1px solid #BCBCBC;
        color: #BCBCBC;
        border-radius: 8px;
        opacity: 1;
      }
    }
  }
</style>
