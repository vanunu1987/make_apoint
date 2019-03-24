<template>
<section class="page">
    
  <div class="drag-container" v-drag-and-drop:options="options">
    <ul class="drag-list">
      <li class="drag-column" v-for="group in groups" :key="group.id"
      :id="'b'+group.serial"
      >
        <span class="drag-column-header">
          <h2>{{ group.name }}</h2>
        </span>

        <ul :id="'a'+group.serial" class="drag-inner-list" :data-id="group.id">
          <li
            class="drag-item"
            v-for="item in filteredItems(group.id)"
            :key="item.id"
            :data-id="item.id"
            :style="{backgroundImage: `url(${item.url})` }"
          >
            <div  class="drag-item-text">{{ item.name }}</div>
          </li>
        </ul>
      </li>
    </ul>
    <input type="text" value="My-Site" class="inputHheder"/>
    <textarea class="description" name="desc" id="" cols="80" rows="1" v-model="currBusiness.prefs.description">
        "Heir cut for man and woman in a decent price!"
    </textarea>
      <div class="mainContiner">
        <li class="component"  v-for="(currCmp, idx) in cmps"
         :key="idx">
                    <component                  
                        :is="currCmp.type" 
                        :loc="currCmp.loc"
                        >

            </component>
            </li>
  </div>

  </div>
    <div class="inputs">
  <input type="text" placeholder="business name" v-model="currBusiness.name" class="inputName"/>
  <input type="text" placeholder="business address- street, house, city" v-model="currBusiness.address"  class="inputadress"/>
  <input type="text" placeholder="phone" v-model="currBusiness.phone" class="inputPhone"/>
  </div>
  <div class="option-bar">
    <button @click="toggleImg" class="fas fa-image"></button>
    <button class="fas fa-calendar-alt"></button>
    <button class="fas fa-palette"></button>
    <button @click="isMapModal=!isMapModal" class="fas fa-map-pin"></button>
</div>
<loc-modal v-if="isMapModal" @setMap="addMap"/>
<button @click="savePage">Done</button>
  </section>
</template>

<script>
import MapCmp from '@/components/MapCmp.vue'
import LocModal from '@/components/LocModal.vue'
export default {
  data() {
    const updateItemsWithNewGroupId = this.updateItemsWithNewGroupId;
    return {
        currBusiness:{phone:'',name:'',address:'',prefs:{description:""}},
        isMapModal:false,
        cmps:[],
      groups: [
        { id: 1, name: "header",isShow:true ,serial:1},
        { id: 2, name: "img bar",isShow:false,serial:8},
        { id: 3, name: "profile" ,serial:3}
      ],
      items: [
        { id: 8, name: "Item 8", groupId: 2 ,url:"https://www.gstatic.com/webp/gallery/1.jpg"},
        { id: 9, name: "Item 9", groupId: 2 ,url:"https://picsum.photos/250"},

      ],
      options: {
        dropzoneSelector: ".drag-inner-list",
        draggableSelector: ".drag-item",
        onDrop(e) {
          const targetGroupId = parseInt(e.droptarget.dataset.id);
          const itemIds = e.items.map(item => parseInt(item.dataset.id));
          updateItemsWithNewGroupId(itemIds, targetGroupId);
        }
      }
    };
  },
  computed: {
    filteredItems() {
      return groupId => this.items.filter(item => item.groupId === groupId);
    },
    //  currBusiness() {
    //   return this.$store.getters.currBusiness;
    // },
  },
  methods: {
    updateItemsWithNewGroupId(itemsIds, groupId) {
      this.items
        .filter(item => itemsIds.indexOf(item.id) >= 0)
        .forEach(item => {
          item.groupId = groupId;
        });
    },
    toggleImg(){
        var group= this.groups.find(group=>group.id===2)
        if (group.serial===2)group.serial=8
        else group.serial=2
    },
    addMap(val){
        this.isMapModal=false
        this.currBusiness.address=val
        let loc= this.$store.getters.currBusiness.location
        console.log(loc);
        this.cmps.push({type:"MapCmp",loc})
    },
    savePage(){
      var cmps=[]
     var hederImgArr=this.items.filter((item)=>item.groupId===1)
     var cmpHeder={type:"header_imgs",data:{img_urls:hederImgArr}}
      cmps.push(cmpHeder)
     var profileImg=this.items.find((item)=>item.groupId===3)
     var cmpProfile={type:"profile_imgs",data:{img_urls:profileImg}}
      cmps.push(cmpProfile)
      this.currBusiness.cmps=cmps

    console.log(this.currBusiness);
    this.$store.dispatch({ type: "setCurrBusiness",currBusiness: this.currBusiness })
 
    }
  },
  components:{
      MapCmp,
      LocModal
  },
  created() {
    let { businessId } = this.$route.params;

    this.$store.dispatch({ type: "loadBusiness", businessId })
    .then((res)=>{
      this.currBusiness=this.$store.getters.currBusiness
    })
  }
};
</script>

<style lang="scss" scoped>
$ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
$to-do: #f4ce46;
$in-progress: #2a92bf;
$approved: #00b961;

* {
  box-sizing: border-box;
}

body {
  background: #33363d;
  color: white;
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.page{
    display: flex;
    flex-direction: column;
}
.option-bar{
    display: flex;
    flex-direction: column;
    position: fixed;
    margin-top: 220px;
    
    button{
        z-index: 10;
        padding: 10px;
        margin: 10px;
        background-color: #fff;
        border-radius: 100%;
        box-shadow: 4px 3px 14px 2px rgba(0,0,0,0.75);
    }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: white;
}

.drag-container {
 height: 555px;
 
}

.drag-list {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 690px) {
    display: block;
    
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: rgba(black, 0.2);
  overflow: hidden;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }

  &-to-do {
    .drag-column-header,
    .drag-options {
      background: $to-do;
    }
  }

  &-in-progress {
    .drag-column-header,
    .drag-options {
      background: $in-progress;
    }
  }

  &-approved {
    .drag-column-header,
    .drag-options {
      background: $approved;
    }
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  user-select: none;
}

.drag-inner-list {
  height: 85vh;
  overflow: auto;
}

.drag-item {
  margin: 10px;
  height: 100px;
  background: rgba(black, 0.4);
  transition: $ease-out;
  // background-image: url("https://www.gstatic.com/webp/gallery/1.jpg");
  border-radius: 5px;
  /* items grabbed state */
  &[aria-grabbed="true"] {
    background: #5cc1a6;
    color: #fff;
  }

  .drag-item-text {
    font-size: 1rem;
    padding-left: 1rem;
    padding-top: 1rem;
  }
}

.drag-header-more {
  cursor: pointer;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 6rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
#a3{
    // background-color: #fff;
    height: 30vh;
    width: 20vw;
    border-radius: 100%;
    .drag-item{
      height: 30vh;
    width: 20vw;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    }
   
 
}
        #a1{
        // background-color: #fff;
        height: 30vh;
        width: 100vw;
        
        border-radius: 5px;
        .drag-item{
          height: 30vh;
        width:100vw;
        border-radius: 5px;
        background-repeat: no-repeat;
        background-size: cover;
        }
        }
 #b2{
        position: fixed;
        background-color: #f4ce46;
        width: 200px;
        height: 50vh;
        border-radius: 5px;
        margin-left: 40px;
        margin-top: 200px
    }
     #a8{
         visibility: hidden;
    }
     #b8{
        position: fixed;
        visibility: hidden;
               
        }
    #b3{
    margin-left: 255px;
    margin-top: 25px;
    border-radius: 5px;

    }
    .inputHheder{
        position: absolute;
        top: 135px;
        font-size: 3rem;
        font-weight: 500;
        &:focus{
            outline:none;
        }

    }
    .inputPhone{
        // position: absolute;
        // top: 615px;
        // left: 175px;
        font-size: 1rem;
        font-weight: 200;
        &:focus{
            outline:none;
        }

    }
    .inputName{
        // position: absolute;
        // top:575px;
        // left: 175px;
        font-size: 1rem;
        font-weight: 200;
        &:focus{
            outline:none;
        }

    }
    .inputadress{
        // position: absolute;
        // top:595px;
        // left: 175px;
        font-size: 1rem;
        font-weight: 200;
        &:focus{
            outline:none;
        }

    }
    .description{
        position: absolute;
        top:270px;
        left: 445px;
        font-size: 1rem;
        font-weight: 200;
        &:focus{
            outline:none;
        }

    }
    .inputs{
        display: flex;
        flex-direction: column;
        margin-left: 255px;
        margin-top: 10px;
         background-color: #fff;
        border: dotted;
        width: 290px;
        height: 125px;
        padding: 3px;
    }
    .mainContiner{
        min-width:600px;
        height: 400px;
        background-color: #fff;
        border: dotted;
        position: absolute;
        top: 292px;
        left: 565px;;
        display: flex;
        z-index: -1;
        li{
            list-style: none;
            margin: 10px;
        }
    }
</style>
