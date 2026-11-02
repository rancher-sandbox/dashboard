// vue-select builds each deselect button's title from this prefix and the option's label.
const DESELECT_PREFIX = 'Deselect ';

export default {
  mounted() {
    this.translateVueSelect();
  },

  updated() {
    this.translateVueSelect();
  },

  methods: {
    // vue-select does not expose these strings as props, so replace them in the rendered DOM.
    translateVueSelect() {
      const exists = this.$store?.getters?.['i18n/exists'];
      const t = this.$store?.getters?.['i18n/t'];

      // A newer @rancher/shell can run inside an older Rancher without these keys, so keep vue-select's English.
      if (typeof exists !== 'function' || typeof t !== 'function' || !exists('labeledSelect.searchOption')) {
        return;
      }

      const setLabel = (el, label) => {
        el.title = label;
        el.setAttribute('aria-label', label);
      };

      this.$el.querySelector('.vs__dropdown-toggle')?.setAttribute('aria-label', t('labeledSelect.searchOption'));

      this.$el.querySelectorAll('.vs__clear').forEach((el) => setLabel(el, t('labeledSelect.clearSelected')));

      this.$el.querySelectorAll('.vs__deselect').forEach((el) => {
        if (el.title.startsWith(DESELECT_PREFIX)) {
          setLabel(el, t('labeledSelect.deselect', { option: el.title.slice(DESELECT_PREFIX.length) }));
        }
      });

      this.$el.querySelectorAll('.vs__spinner').forEach((el) => {
        el.textContent = t('labeledSelect.loading');
      });
    },

    mappedKeys(map, vm) {
      // Defaults found at - https://github.com/sagalbot/vue-select/blob/master/src/components/Select.vue#L947
      const out = { ...map };

      // tab
      (out[9] = (e) => {
        // user esc'd
        if (!vm.open) {
          return;
        }

        e.preventDefault();
      });

      // escape
      (out[27] = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.isOpen = false;
        vm.open = false;
        vm.search = '';

        this.$refs.select.focus();

        return false;
      });

      // enter
      (out[13] = (e, opt) => {
        if (!vm.open) {
          vm.open = true;

          return;
        }

        // if the index of the option is -1
        // it means are pressing enter on an invalid option
        // we should exit
        if (vm.typeAheadPointer === -1) {
          return;
        }

        let option = vm.filteredOptions[vm.typeAheadPointer];

        vm.$emit('option:selecting', option);

        if (!vm.isOptionSelected(option)) {
          if (vm.taggable && !vm.optionExists(option)) {
            vm.$emit('option:created', option);
          }
          if (vm.multiple) {
            option = vm.selectedValue.concat(option);
          }
          vm.updateValue(option);
          vm.$emit('option:selected', option);

          if (vm.closeOnSelect) {
            // this ties in to the Select component implementation
            // so that the enter key handler doesn't open the dropdown again
            vm.open = false;
            vm.typeAheadPointer = -1;
          }

          if (vm.clearSearchOnSelect) {
            vm.search = '';
          }
        }
      });

      //  up.prevent
      (out[38] = (e) => {
        e.preventDefault();

        if (!vm.open) {
          vm.open = true;
        }

        return vm.typeAheadUp();
      });

      //  down.prevent
      (out[40] = (e) => {
        e.preventDefault();

        if (!vm.open) {
          vm.open = true;
        }

        return vm.typeAheadDown();
      });

      return out;
    },
  }
};
