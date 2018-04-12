import '../assets/styles/footer.styl'

export default {
  data() {
    return {
      author: 'jay'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>written by {this.author}</span>
      </div>
    )
  }
}