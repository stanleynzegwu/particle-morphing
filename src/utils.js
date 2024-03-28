import gsap from "gsap"

export const animateProgression = (propertyToAnimate,point,material) => {
    gsap.timeline().fromTo(
      propertyToAnimate,
      { value: 0 }, /**  Initial value */
      {
        value: 1, /** Target value */
        duration: 3.5,
        ease: "linear",
        delay: 2,
        onComplete: () => {
            point.visible = false
            material.dispose()
        }
      }
    )
}