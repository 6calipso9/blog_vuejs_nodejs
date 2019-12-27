<template>
  <div class="about main_style_1" style="width: 80%">
    <div style="padding: 20px 0">
      <h1 style="width: 100%">Используемые технологии</h1>
      <dl>
        <dt>Nest.js</dt>
        <dd> - это масштабируемая серверная среда JavaScript, созданная на основе TypeScript, которая 
          сохраняет совместимость с JavaScript, что делает его эффективным инструментом для создания
          эффективных и надежных серверных приложений. Он имеет модульную архитектуру, которая обеспечивает
          зрелый, структурный шаблон проектирования для мира разработки Node.js.</dd>
        <dt>Vue.js</dt>
        <dd> - это интерфейсный JavaScript-фреймворк для создания пользовательских интерфейсов. Он имеет
          простой, но очень мощный API и отличную производительность. Vue.js способен запитывать
          интерфейсный уровень и логику любого веб-приложения независимо от его размера. Простота интеграции
          его с другими библиотеками или существующими проектами делает его идеальным выбором для
          большинства современных веб-приложений.</dd> 
      </dl>
    </div>
    <h1 style="width: 100%">О нас</h1>
    <div class="main_style_2" style="order: 2">
      <!-- <img src="" width=300px style="border-radius: 25px"> -->
      <p>email: <a href="">email_1</a></p>
      <p style="margin: 0px">mobile number: ... </p>
    </div>
    <div class="main_style_2" style="order: 3">
      <!-- <img src="" width=300px style="border-radius: 25px"> -->
      <p>email: <a href="">email_2</a></p>
      <p style="margin: 0px">mobile number: ... </p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AboutComponent',
  props: {
    msg: String
  },
  methods: {
    resolve_img_url: function (path) {
      return require.context("./img/" + path, false)
    }
  }
}
</script>