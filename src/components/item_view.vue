<script setup lang="ts">
import type { Ref } from 'vue'
import type Item from '~/types/Item'
import { useFlagStore } from '~/store/flags.module'

const props = defineProps<{ item: Item }>()
const flags = useFlagStore()

const currentItem: Ref<Item> = ref(props.item)
const imageURL = ref('')
const message = ref('')

const amount = ref(1)

function retrieveItem() {
  imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${currentItem.value.fileName}`
}

function buy() {
  if (amountCheck(amount.value))
    flags.changePopUpPurchase(amount.value)
}

function amountCheck(amountz: number) {
  if (amountz > 10) {
    message.value = 'Слишком много одинаковых пицц одним заказом'
    amount.value = 1
    return false
  }
  if (amountz < 0) {
    message.value = 'Слишком маленький заказ'
    amount.value = 1
    return false
  }
  return true
}

retrieveItem()
</script>

<template>
  <div class="card">
    <div class="bg-yellow">
      <div class="text-right">
        <button type="button" class="btn-close" @click.prevent="flags.closePopUps" />
      </div>
    </div>
    <div class="card-container text-center">
      <img
        :src="imageURL"
        class="rounded mx-auto product-img"
      >
      <div>
        <label><strong>Наименование:</strong></label> <br>
        <span class="text-warning">
          {{ currentItem.title }}
        </span>
      </div>
      <span class="text-warning">
        {{ currentItem.description }}
      </span>
      <div>
        <label>Цена: &nbsp;</label>
        <span class="text-warning">
          {{ ` ${currentItem.price}руб` }}
        </span>
      </div>

      <div class="form-group">
        <label for="amount">Количество</label>
        <input
          v-model="amount" name="amount" class="text-center" type="number" min="1" max="10"
        >
      </div>
      <br>
      <div>
        <button class="d-inline-flex justify-content-center badge bg-green" @click="buy">
          <p i-carbon-shopping-bag />&nbsp;
          Купить
        </button>
      </div>
      <div
        v-if="message"
        class="alert alert-danger"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  max-width: 350px !important;
  padding: 20px 25px 30px;
}
.card {
  background-color: whitesmoke;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  position:fixed;  z-index: 6;
  top: 30%;
  left: 50%;
  margin-left:-100px;
  margin-top:-200px;
}

.badge {
    margin: 5px;
    font-size: 20px;
    width: 150px;
  }

  .product-img {
    max-height: 250px;
  }
</style>
