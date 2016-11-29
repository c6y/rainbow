import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const QuicksSchema = {};

QuicksSchema.Links = new SimpleSchema({
  name: {
    type: String,
    unique: true,
    autoValue: function() {
      if (this.isSet && typeof this.value === "string") {
        return this.value.toLowerCase();
      }
    }
  },
  slug: {
    type: String,
    unique: false
  },
  query: {
    type: String,
    unique: false,
    // only allow 'tag', 'project' and 'name', else return default
    autoValue: function() {
      if (this.isSet && typeof this.value === "string") {
        console.log('this.value: ' + this.value);
        const isTag = this.value === 'tag';
        const isProject = this.value === 'project';
        const isName = this.value === 'name';
        if (!isTag && !isProject && !isName) {
          return 'default';
        }
      }
    }
  }
});
