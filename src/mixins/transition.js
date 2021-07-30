import gsap from 'gsap'
export default{

    methods:{
        beforeEnter(el) {
            console.log("test")
            let tl=gsap.timeline()
            tl.to('.transitionClass',{
                zIndex:10,
                duration:.1,
                opacity:1,
                backgroundColor:"white",
            })
            tl.to('.transitionClass',{
                zIndex:10,
                duration:1,
                opacity:1,
                backgroundColor:"#696869",
            })
            tl.to('.transitionClass',{
                zIndex:-10,
                opacity:0,
                duration:1,
                backgroundColor:"white",
            })
          },
          // the done callback is optional when
          // used in combination with CSS
          enter(el, done) {
            console.log("entering Transition")
            
            
            done()
          },
          afterEnter(el) {
        
          },
          enterCancelled(el) {
            // ...
          },
        
          // --------
          // LEAVING
          // --------
        
          beforeLeave(el) {
           
          },
          // the done callback is optional when
          // used in combination with CSS
          leave(el, done) {
            
            done()
          },
          afterLeave(el) {
            
          },
          // leaveCancelled only available with v-show
          leaveCancelled(el) {
            // ...
          }
    }
    
}
