<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="fas fa-barcode" color="primary" dark v-on="on"></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Product Details</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 >
                <v-text-field label="Product Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field label="Product Price" hint="Price in USD"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['30m', '45m', '1h', '2h']"
                  label="duration*"
                  required
                ></v-select>
              </v-flex>
              
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
     
    data: () => ({
      dialog: false
    })
  }
  
</script>
<style lang="scss" scoped>
v-btn.fas{
    color: black;
    background-color: white;
    opacity: 0;
    font-size: 2.5rem
}
</style>
