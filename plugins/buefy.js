
import Vue from 'vue'

//  MDI imports
import 'vue-material-design-icons/styles.css';
import AccountIcon from 'vue-material-design-icons/Account.vue';
import InformationIcon from 'vue-material-design-icons/Information.vue';
import HomeIcon from 'vue-material-design-icons/Home.vue';
import AccountCircleIcon from 'vue-material-design-icons/AccountCircle.vue';
import CogIcon from 'vue-material-design-icons/Cog.vue';
import UploadIcon from 'vue-material-design-icons/Upload.vue';
import MessageIcon from 'vue-material-design-icons/Message.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import BackspaceIcon from 'vue-material-design-icons/Backspace.vue';
import ContentCopyIcon from 'vue-material-design-icons/ContentCopy.vue';
import AlertCircleIcon from 'vue-material-design-icons/AlertCircle.vue';

// Buefy imports
import {Input,Navbar,Button,Field,Modal,Notification,Dialog,Select,ConfigProgrammatic, Toast, Icon, Upload} from 'buefy'

// Use individual components
Vue.use(Input)
Vue.use(Navbar)
Vue.use(Button)
Vue.use(Field)
Vue.use(Modal)
Vue.use(Notification)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Upload)


// Icon to Vue components 
Vue.component('account-icon', AccountIcon);
Vue.component('information-icon', InformationIcon);
Vue.component('home-icon', HomeIcon);
Vue.component('account-circle-icon', AccountCircleIcon);
Vue.component('cog-icon', CogIcon);
Vue.component('upload-icon', UploadIcon);
Vue.component('message-icon', MessageIcon);
Vue.component('delete-icon', DeleteIcon);
Vue.component('backspace-icon', BackspaceIcon);
Vue.component('content-copy-icon', ContentCopyIcon);
Vue.component('alert-circle-icon', AlertCircleIcon);
// Custom component to proxy 
ConfigProgrammatic.setOptions({
    //defaultIconComponent: "vue-material-design-icons",
    defaultIconPack: "mdip", // Do I have to give a custom name ?
    customIconPacks: {
      mdip: { // Same name that was declared earlier ?
        sizes: {
          default: "1.5x",
          "is-small": "1x",
          "is-medium": "2x",
          "is-large": "3x"
        },
        iconPrefix: "",
        internalIcons: {
          account: "account-icon",
          information: 'information-icon',
          home: "home-icon",
          accountCircle: "account-circle-icon",
          cog: "cog-icon",
          upload: "upload-icon",
          message: "message-icon",
          delete: "delete-icon",
          backspace: "backspace-icon",
          contentCopy: "content-copy-icon",
          alertCircle: "alert-circle-icon"
        }
      }
    }
});
  