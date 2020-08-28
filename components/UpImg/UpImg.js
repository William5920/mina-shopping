Component({
    properties: {
        src: {
          type: String,
          default: ''
        },
        index: {
            type: Number
        }
      },
      methods: {
        handleTap(e) {
            // console.log(e.currentTarget.dataset)
            const {index} = e.currentTarget.dataset
            this.triggerEvent('deleteImg', {index})
        }
      }
})