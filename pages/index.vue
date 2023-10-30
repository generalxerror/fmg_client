<template>
  <div class="flex flex-col p-4">
    <div class="pixelop-font text-center text-6xl font-bold uppercase text-primary">
      Fair Mobile Games
    </div>

    <div class="pixelop-font text-center text-xl font-bold uppercase text-gray-400">
      Bringing shameless developers to shame
    </div>

    <ReportSection />

    <div class="my-4 h-0.5 w-full bg-gray-100" />

    <SearchSection />

    <div class="pixelop-font mt-8 rounded-t-lg bg-danger text-center text-4xl font-bold uppercase text-white">
      Latest Reports
    </div>
    <div class="grid w-full grid-cols-2 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6">
      <AppTile
        v-for="i in 6"
        :key="i"
        icon-url="https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP"
        title="Youtube"
        rating="3.2"
        dev-name="dev name"
        review="This is a very bad game. I could not even pass the first level and I got bombarded with ads"
        review-date="Mar 1st, 2023"
      />
    </div>

    <div class="pixelop-font mt-8 rounded-t-lg bg-danger text-center text-4xl font-bold uppercase text-white">
      Worst Apps
    </div>
    <div class="grid w-full grid-cols-2 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6">
      <AppTile
        v-for="i in 6"
        :key="i"
        icon-url="https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP"
        title="Youtube"
        rating="3.2"
        dev-name="dev name"
        review="This is a very bad game. I could not even pass the first level and I got bombarded with ads"
        review-date="Mar 1st, 2023"
      />
    </div>

    <div class="pixelop-font mt-8 rounded-t-lg bg-danger text-center text-4xl font-bold uppercase text-white">
      Worst Devs
    </div>
    <div class="grid w-full grid-cols-2 gap-4 rounded-b-lg border-2 border-danger px-2 py-4 md:grid-cols-3 lg:grid-cols-6">
      <AppTile
        v-for="i in 6"
        :key="i"
        icon-url="https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP"
        title="Youtube"
        rating="3.2"
        dev-name="dev name"
        review="This is a very bad game. I could not even pass the first level and I got bombarded with ads"
        review-date="Mar 1st, 2023"
      />
    </div>
  </div>
</template>
