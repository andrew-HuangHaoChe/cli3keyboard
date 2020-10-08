<template>
  <div>
    <div class="hpImg">
      <img
        src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        v-scrollanimation>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
  .hpImg {
    z-index: 0;
    position: relative;
    width: 100%;
  }
  .hpImg > img {
    height: 400px;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    .hpImg > img {
      height: 300px;
    }
  }
  .before-enter {
    opacity: 0;
    transform: translateY(150px);
    transition: all 2s ease-out;
  }
  .enter {
    opacity: 1;
    transform: translateY(0px);
  }
</style>
