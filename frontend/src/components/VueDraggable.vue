<template>
<section class="page">
    
  <div class="drag-container" v-drag-and-drop:options="options">
    <ul class="drag-list">
      <li class="drag-column" 
          v-for="group in groups" 
          :key="group.id"
          :id="'b'+group.serial">

        <ul :id="'a'+group.serial" class="drag-inner-list" :data-id="group.id">
          <li
            class="drag-item"
            v-for="item in filteredItems(group.id)"
            :key="item.id"
            :data-id="item.id"
            :style="{backgroundImage: `url(${item.url})` }"
          >
            <div  class="drag-item-text"></div>
          </li>
        </ul>
      </li>
      <div class="mapContiner">
        <li class="component"  v-for="(currCmp, idx) in mapCmps"
         :key="idx">
                    <component                  
                        :is="currCmp.type" 
                        :loc="currCmp.loc"
                        style="{width:280px;height:350px"
                        >

            </component>
            </li>
  </div>
      <div class="inputs">
  <input type="text" placeholder="business name" v-model="currBusiness.name" class="inputName"/>
  <input type="text" placeholder="business address- street, house, city" v-model="currBusiness.address"  class="inputadress"/>
  <input type="text" placeholder="phone" v-model="currBusiness.phone" class="inputPhone"/>
  </div>


    </ul>
    <input type="text" value="My-Site" class="inputHheder"/>
    <!-- <textarea placeholder="Write short description" class="description" name="desc" id="" cols="80" rows="1" v-model="currBusiness.prefs.description">
        
    </textarea> -->
      <div class="mainContiner">
        <li class="component"  v-for="(currCmp, idx) in cmps"
         :key="idx">
                    <component                  
                        :is="currCmp.type" 
                        :loc="currCmp.loc"
                        style="{width:280px;height:350px"
                        >

            </component>
            </li>
  </div>
      
  </div>
  <div class="option-bar">
    <button @click="toggleImg" class="fas fa-image"></button>
    <button @click="isCalendar=!isCalendar" class="fas fa-calendar-alt"></button>
    <button class="fas fa-palette"></button>
    <button @click="isMapModal=!isMapModal" class="fas fa-map-pin"></button>
</div>
<loc-modal v-if="isMapModal" @setMap="addMap"/>
<button @click="savePage">Done</button>
<user-login-signUp :isNewUserProp="true" :isNewBus="true" class="login" v-if="isSignUp" @closeSignUp="isSignUp=!isSignUp" />
<work-hours class="workHourCmp" v-if="isCalendar" @setWorkTime="setWorkTime"/>
  </section>
</template>
<script>
import userLoginSignUp from '@/components/UserLoginSignup.vue'
import MapCmp from '@/components/MapCmp.vue'
import LocModal from '@/components/LocModal.vue'
import WorkHours from '@/components/WorkHours.vue'
import CalendarMakeAppoint from '@/components/CalendarMakeAppoint.vue'
export default {
  data() {
    const updateItemsWithNewGroupId = this.updateItemsWithNewGroupId;
    return {
      isCalendar:false,
        isSignUp: false,
        currBusiness:{phone:'',name:'',address:'',prefs:{description:""}},
        isMapModal:false,
        cmps:[],
        mapCmps:[],
      groups: [
        { id: 1, name: "header",isShow:true ,serial:1},
        { id: 2, name: "img bar",isShow:false,serial:8},
        { id: 3, name: "profile" ,serial:3}
      ],
      items: [
        { id: 8, name: "Item 8", groupId: 2 ,url:"http://www.cndajin.com/data/wls/113/10786885.jpg"},
        { id: 9, name: "Item 9", groupId: 2 ,url:"http://www.cndajin.com/data/wls/113/10786784.jpg"},

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
        this.mapCmps.push({type:"MapCmp",loc})
    },
    setWorkTime(workTime){
      this.isCalendar= false
      this.currBusiness.workHours=workTime
        this.cmps.push({type:"CalendarMakeAppoint"})

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
    this.isSignUp=true;
 
    }
  },
  components:{
      MapCmp,
      LocModal,
      userLoginSignUp,
      WorkHours,
      CalendarMakeAppoint
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
.workHourCmp{
  position: fixed;
  top: 200px;
  left:450px;
}
body {
  background: #33363d;
  color: white;
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;

}
.drag-list{
    // display: flex;
    // flex-direction: column;
    display: grid;
    grid-template-columns: 1fr 1.5fr 2fr 1fr;
    grid-auto-rows: 2fr 2fr 1fr .5fr;
    #b1{
      grid-column: 1/5;
      grid-row: 1;
      background-color: #5cc1a6;
      
    }
   
    
    #b3{
      grid-column: 2;
      grid-row: 2;

 
    }
    .mapContiner{
      grid-column: 1/5;
      grid-row: 3;

    }
    .inputs{
 grid-column: 2;
      grid-row: 2;

    }
    
}
.option-bar{
    display: flex;
    flex-direction: column;
    position: fixed;
    top:150px;
    // margin-top: 220px;
    
    button{
        z-index: 10;
        padding: 15px;
        margin: 10px;
        font-size: 2rem;
        background-color: #fff;
        border-radius: 100%;
        box-shadow: 4px 3px 14px 2px rgba(0,0,0,0.75);
         &:focus{
            outline:none;
        }
    }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: white;
}

.drag-container {
//  height: 555px;
 
}

.drag-list {
  // display: flex;
  // align-items: flex-start;
  // flex-direction: column;

  @media (max-width: 690px) {
    display: block;
    
  }
}

.drag-column {
  // flex: 1;
  // position: relative;
  // background: rgba(black, 0.2);
  // overflow: hidden;

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
  // overflow: auto;
}

.drag-item {
  // height: 100px;
  background: rgba(black, 0.4);
  transition: $ease-out;
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
  // height: 6rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
#a3{
    // background-color: #fff;
    // height: 33vh;
    // min-width: 320px;
    border-radius: 100%;
    .drag-item{
      max-height:270px;
      max-height: 245px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    }
   
 
}
        #a1{
        // background-color: #fff;
        // height: 40vh;
        // width: 100vw;
        
        border-radius: 5px;
        .drag-item{
          height: 90vh;
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
        margin-top: 200px;
        padding: 5px;
         .drag-item{
           margin: 4px;
           height: 100px;
           background-position: center;
          background-size: contain;
          }
         }
    
     #a8{
         visibility: hidden;
    }
     #b8{
        position: fixed;
        visibility: hidden;
               
        }
    #b3{
    // margin-left: 255px;
    // margin-top: 15px;
    border-radius: 5px;
    padding: 5px;
    // grid-column: 2;
    height: 310px;
    background-color: #00b961;

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
        // position: absolute;
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
        margin-top: 275px;
         background-color: #fff;
        border: dotted;
        width: 393px;
        height: 130px;
        padding: 3px;
    }
    .mainContiner{
        min-width:600px;
        height: 400px;
        background-color: #fff;
        border: dotted;
        // position: absolute;
        // top: 322px;
        // left: 595px;;
        // display: flex;
        // z-index: -1;
        li{
            list-style: none;
            margin: 10px;
        }
    }
    .login{
      z-index: 100;
    }
</style>
