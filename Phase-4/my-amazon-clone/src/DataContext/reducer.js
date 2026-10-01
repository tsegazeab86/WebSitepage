import { Type } from '../Utility/action.type';

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      // 🟢 String() በመጠቀም የ Number እና String ID መጋጨትን እንከላከላለን
      const existingItem = state.basket.find(
        (item) => String(item.id) === String(action.item.id)
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) =>
          String(item.id) === String(action.item.id)
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      // 🟢 እዚህም ID ንጽጽሩ በ String() እንዲሆን ተደርጓል
      const index = state.basket.findIndex(
        (item) => String(item.id) === String(action.id)
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1); // ብዛቱ 1 ከሆነ ከ Array ውስጥ ሙሉ በሙሉ ያስወግደዋል
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    // 🟢 ክፍያ ከተፈጸመ በኋላ ካርቱን ባዶ ለማድረግ
    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};