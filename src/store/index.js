import { createStore } from 'vuex'
import axios from 'axios'

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
    main_navigation:null
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
  },
  actions: {
    async serverStart({ commit, dispatch }) {

      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8055/auth/login', {
          email: "schwarz@runze-casper.de",
          password: "admin123",
          mode: "json"
        }).then(resp => {
          const token = resp.data.data.access_token
          console.log("starting auth")
          console.log(token)
          commit('setToken', resp.data.data.access_token)
          commit('setRefreshToken', resp.data.data.refresh_token)
          resolve(resp)
        }).catch(err => {
        })
      })
    },
    async getHeros({ commit, dispatch }) {

      let url = 'http://localhost:8055/items/hero'
      //console.log(url)
      //console.log(this.state.token)
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      let result = res.data.data
      console.log("Heros", result)
      commit('setHero', result)


    },

    async getMosaic({ commit, dispatch }, id) {

      let url = 'http://localhost:8055/items/kacheln'
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
      console.log("Mosaic", result)

      let filter = JSON.stringify(result[0].bestandteile)
      console.log("filter", filter)
      url = 'http://localhost:8055/items/kachel?filter={ "id" : { "_in" : ' + filter + '}}'
      console.log("filter", url)
      res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        },
      )
      result = res.data.data
      console.log("Mosaic", result)
      commit('setMosaic', result)


    },
    async getTeaser({ commit, dispatch }) {

      let url = 'http://localhost:8055/items/teaser'
      //console.log(url)
      //console.log(this.state.token)
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      let result = res.data.data
      console.log("Teaser", result)
      commit('setTeaser', result)


    },
    async getImagesArray({ commit, dispatch, state }, payload){
      let url = 'http://localhost:8055/items/'+payload.collection+'?filter[id][_eq]='+payload.id+'&fields=bilder.*'
     
      console.log("filter", url)
      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        },
      )

      console.log("images",res.data.data )
      commit("setImageArray",res.data.data)
    },
    async loadPage({ commit, dispatch, state }, slug) {
      let url = "http://localhost:8055/items/seite?filter[slug_seite][titel][_eq]=" + slug + "&fields=elemente.item:hero.*&fields=elemente.item:hero.navigation.inhalte.page_navigations_id.*&fields=theme_color"
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
      let url = "http://localhost:8055/items/navigation?filter[titel][_eq]=main_nav&fields=inhalte.page_navigations_id.*"

      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      commit('setMainNav', res.data.data)
    },
    async getImagesTeaser({ commit, dispatch, state }, id) {
      let url = "http://localhost:8055/items/teaser?filter[id][_eq]=" + id + "&fields=bilder.*"

      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      console.log("Bilder setImagesTeaser", res.data.data)
      commit('setImagesTeaser', res.data.data)
    },
    async getMosaicKacheln({ commit, dispatch, state }, id) {
      let url = "http://localhost:8055/items/kacheln?filter[id][_eq]=" + id + "&fields=bestandteile.slug_seite.*&fields=bestandteile.*"

      let res = await axios.get(url,
        {
          'headers': {
            'Authorization': 'Bearer ' + this.state.token,
          }
        })
      console.log("Bilder setKacheln", res.data.data)
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
  },
  modules: {
  }
})
