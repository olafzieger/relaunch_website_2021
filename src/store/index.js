import { createStore } from 'vuex'
import axios from 'axios'

const base_url="http://109.239.58.167:8057"

export default createStore({
  state: {
    token: null,
    refreshToken: null,
    hero: null,
    kacheln: null,
    teaser: null,
    image: null,
    page: null,
    item: null,
    matrix: null,
    mosaic: null,
    imagesTeaser: null,
    kacheln:null,
    navigation:null,
    image_array:null,
    main_navigation:null,
    footer:null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setRefreshToken(state, token) {
      state.refreshToken = token
    },
    setHero(state, hero) {
      state.hero = hero
    },
    setMosaic(state, kacheln) {
      state.kacheln = kacheln
    },
    setTeaser(state, teaser) {
      state.teaser = teaser
    },
    setImage(state, image) {
      state.image = image
    },
    setPage(state, page) {
      state.page = page
    },
    setMatrix(state, matrix) {
      state.matrix = matrix
    },
    setMosaic(state, mosaic) {
      state.mosaic = mosaic
    },
    setImagesTeaser(state, images) {
      state.imagesTeaser = images
    },
    setKacheln(state, kacheln) {
      state.kacheln = kacheln
    },
    setMainNav(state, main_navigation) {
      state.main_navigation = main_navigation
    },
    setImageArray(state, image_array) {
      state.image_array = image_array
    },
    setFooter(state, footer) {
      state.footer = footer
    },
  },
  actions: {
    async serverStart({ commit, dispatch }) {

      return new Promise((resolve, reject) => {
        axios.post(base_url+'/auth/login', {
          email: "schwarz@runze-casper.de",
          password: "admin123",
          mode: "json"
        }).then(resp => {
          const token = resp.data.data.access_token
          commit('setToken', resp.data.data.access_token)
          commit('setRefreshToken', resp.data.data.refresh_token)
          console.log("login",resp.data.data.access_token)
          resolve(resp)
        }).catch(err => {
        })
      })
    },
    async getHeros({ commit, dispatch }) {

      let url = base_url+'/items/hero'
      //console.log(url)
      console.log(this.state.token)
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      let result = res.data.data
      commit('setHero', result)


    },

    async getMosaic({ commit, dispatch }, id) {

      let url = base_url+'/items/kacheln'
      //console.log(url)
      //console.log(this.state.token)
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        }
      )
      let result = res.data.data
      
      let filter = JSON.stringify(result[0].bestandteile)

      url = base_url+'/items/kachel?filter={ "id" : { "_in" : ' + filter + '}}'
      res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        },
      )
      result = res.data.data
      commit('setMosaic', result)


    },
    async getTeaser({ commit, dispatch }) {

      let url = base_url+'/items/teaser'
      //console.log(url)
      //console.log(this.state.token)
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      let result = res.data.data
      commit('setTeaser', result)


    },
    async getImagesArray({ commit, dispatch, state }, payload){
      let url = base_url+'/items/'+payload.collection+'?filter[id][_eq]='+payload.id+'&fields=bilder.*'
     
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        },
      )

      commit("setImageArray",res.data.data)
    },
    async loadPage({ commit, dispatch, state }, slug) {
      let url = base_url+"/items/seite?filter[seite_slug][titel][_eq]=" + 
                slug + 
                "&fields=elemente.item:hero.*&"+
                "fields=elemente.item:hero.navigation.inhalte.page_navigations_id.*"+
                "&fields=theme_color&fields=elemente.item:einzel_beitrag.link_box_link.*"+
                "&fields=theme_color&fields=elemente.item:einzel_beitrag.*"+
                "&fields=elemente.item:logo_showcase.logos.*"+
                "&fields=elemente.item:logo_showcase.template_name"+
                "&fields=elemente.item:teaser.*"+
                "&fields=elemente.item:infokacheln.*"+
                "&fields=elemente.item:infokacheln.kacheln.*.*"+
                "&fields=elemente.item:infobilder.*"+
                "&fields=elemente.item:infobilder.bilder.*"+
                "&fields=elemente.item:kacheln.*"+
                "&fields=elemente.item:kacheln.*.*"+
                "&fields=elemente.item:kacheln.*.*.*"+


                "&fields=elemente.item:teaser.navigation.*"
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      console.log("Pages", res.data.data)
      commit('setPage', res.data.data)


    },
    async loadMainNav({ commit, dispatch, state }) {
      let url = base_url+"/items/navigation?filter[titel][_eq]=main_nav&fields=*.*"

      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      commit('setMainNav', res.data.data)
    },
    async loadMainFooter({ commit, dispatch, state }) {
      let url = base_url+"/items/footer?fields=*.*&fields=links.page_navigations_id.*"

      let res = await axios.get(url)
      console.log("loading Footer",res.data.data[0]);
      commit('setFooter', res.data.data[0])
    },
    async getImagesTeaser({ commit, dispatch, state }, id) {
      let url = base_url+"/items/teaser?filter[id][_eq]=" + id + "&fields=bilder.*"

      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      commit('setImagesTeaser', res.data.data)
    },
    async getMosaicKacheln({ commit, dispatch, state }, id) {
      let url = base_url+"/items/kacheln?filter[id][_eq]=" + id + "&fields=bestandteile.seite.*&fields=bestandteile.*.*&fields=erweiterbar"

      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      commit('setKacheln', res.data.data)
    }

  },
  getters: {
    getArticles: state => {
      return state.heros
    },
    getMosaic: state => {
      return state.kacheln
    },
    getTeaser: state => {
      return state.teaser
    },
    getImage: state => {
      return state.image
    },
    getPage: state => {
      return state.page
    },
    getMatrix: state => {
      return state.matrix
    },
    getImagesTeaser: state => {
      return state.imagesTeaser
    },
    getKacheln: state => {
      return state.kacheln
    },
    getMainNav: state => {
      return state.main_navigation
    },
    getImageArray: state => {
      return state.image_array
    },
    getFooter: state => {
      return state.footer
    },
  },
  modules: {
  }
})
