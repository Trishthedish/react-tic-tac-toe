import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { render, screen, fireEvent, waitFor, prettyDOM} from '@testing-library/react'


describe('App', () => {
  // Helper function to click on buttons in the grid
  const clickButtonAndVerifyResult = (container, buttonIndex, expectedResult) => {
    let buttons = container.querySelectorAll('.grid button');
    fireEvent.click(buttons[buttonIndex]);
    
    buttons = container.querySelectorAll('.grid button');
    expect(buttons[buttonIndex].innerHTML).toEqual(expectedResult);
  }

  describe('Wave 2: clicking on squares and rendering App', () => {

  test('App renders with a board of 9 empty buttons', () => {
    // Arrange-Act - Render the app
    const { container } = render(<App />);

    const buttons = container.querySelectorAll('.grid button');

    // Assert (9 buttons in the grid)
    expect(buttons.length).toEqual(9);
    buttons.forEach((button) => {
      expect(button.innerHTML).toEqual('');
    });
  });

  test('App has the header: "React Tic Tac Toe"', () => {
    // Arrange-Act
    render(<App />);

    const header = screen.getByText('React Tic Tac Toe');

    // Assert
    expect(header).toBeInTheDocument();
  });

  test('Clicking on a grid button changes the text on it to an "🦶"', () => {
    // Arrange
    const { container } = render(<App />);

    // Act-assert
    clickButtonAndVerifyResult(container, 0, '🦶');
  });

  test('Clicking on the 1st button makes it an "🦶" and the 2nd an "📌"', () => {
    // Arrange
    const { container } = render(<App />);

    //Act-Assert
    clickButtonAndVerifyResult(container, 0, '🦶');
    clickButtonAndVerifyResult(container, 8, '📌');
  });

  test('clicking on the same square twice doesn\'t change things', () => {
    // Arrange
    const { container } = render(<App />);

    // Act
    let buttons = container.querySelectorAll('.grid button');
    fireEvent.click(buttons[0]);

    // after the click there should be a square with an "x"
    let clickedButton = screen.getByText('🦶');
    expect(clickedButton).toBeInTheDocument();

    buttons = container.querySelectorAll('.grid button');
    fireEvent.click(buttons[0]);

    // Assert
    // after the 2nd click there should still be a square with an "x"
    clickedButton = screen.getByText('🦶');
    expect(clickedButton).toBeInTheDocument();


    const xButtons = screen.queryAllByText('🦶');
    expect(xButtons.length).toEqual(1);
    const oButtons = screen.queryAllByText('o');
    expect(oButtons.length).toEqual(0);
  });
});

  
  describe('Wave 3:  Winner tests', () => {
    describe('Prints "Winner is 🦶" when 🦶 wins', () => {
      test('that a winner will be identified when 3 🦶s get in a row across the top', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 0, '🦶');
        clickButtonAndVerifyResult(container, 3, '📌');
        clickButtonAndVerifyResult(container, 2, '🦶');
        clickButtonAndVerifyResult(container, 4, '📌');
        clickButtonAndVerifyResult(container, 1, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });

      test('that a winner will be identified when 3 🦶s go accross the middle row', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 3, '🦶');
        clickButtonAndVerifyResult(container, 1, '📌');
        clickButtonAndVerifyResult(container, 5, '🦶');
        clickButtonAndVerifyResult(container, 2, '📌');
        clickButtonAndVerifyResult(container, 4, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });
      test('that a winner will be identified when 3 🦶s go accross the bottom row', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 6, '🦶');
        clickButtonAndVerifyResult(container, 1, '📌');
        clickButtonAndVerifyResult(container, 8, '🦶');
        clickButtonAndVerifyResult(container, 2, '📌');
        clickButtonAndVerifyResult(container, 7, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });
    
      test('that a winner will be identified when 3 🦶s go accross the left column', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 3, '🦶');
        clickButtonAndVerifyResult(container, 1, '📌');
        clickButtonAndVerifyResult(container, 6, '🦶');
        clickButtonAndVerifyResult(container, 2, '📌');
        clickButtonAndVerifyResult(container, 0, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });
      test('that a winner will be identified when 3 🦶s go accross the center column', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 4, '🦶');
        clickButtonAndVerifyResult(container, 0, '📌');
        clickButtonAndVerifyResult(container, 7, '🦶');
        clickButtonAndVerifyResult(container, 2, '📌');
        clickButtonAndVerifyResult(container, 1, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });
      test('that a winner will be identified when 3 🦶s go accross the right column', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 2, '🦶');
        clickButtonAndVerifyResult(container, 0, '📌');
        clickButtonAndVerifyResult(container, 5, '🦶');
        clickButtonAndVerifyResult(container, 1, '📌');
        clickButtonAndVerifyResult(container, 8, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });

      test('that a winner will be identified when 3 🦶s go accross the top-left to bottom-right', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 0, '🦶');
        clickButtonAndVerifyResult(container, 1, '📌');
        clickButtonAndVerifyResult(container, 4, '🦶');
        clickButtonAndVerifyResult(container, 2, '📌');
        clickButtonAndVerifyResult(container, 8, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });
      test('that a winner will be identified when 3 🦶s go accross the top-right to bottom-left', () => {
        // Arrange
        const { container } = render(<App />);

        // Act
        clickButtonAndVerifyResult(container, 2, '🦶');
        clickButtonAndVerifyResult(container, 0, '📌');
        clickButtonAndVerifyResult(container, 4, '🦶');
        clickButtonAndVerifyResult(container, 3, '📌');
        clickButtonAndVerifyResult(container, 6, '🦶');

        // Assert
        const winnerScreen = screen.queryByText('Winner is 🦶')
        expect(winnerScreen).not.toBeNull();
        expect(winnerScreen).toBeInTheDocument();
      });
    });
  });


  describe('Prints "Winner is o" when o wins', () => {
    test('that a winner will be identified when 3 📌s get in a row across the top', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 3, '🦶');
      clickButtonAndVerifyResult(container, 0, '📌');
      clickButtonAndVerifyResult(container, 4, '🦶');
      clickButtonAndVerifyResult(container, 1, '📌');
      clickButtonAndVerifyResult(container, 6, '🦶');
      clickButtonAndVerifyResult(container, 2, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });

    test('that a winner will be identified when 3 📌s go accross the middle row', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 1, '🦶');
      clickButtonAndVerifyResult(container, 3, '📌');
      clickButtonAndVerifyResult(container, 0, '🦶');
      clickButtonAndVerifyResult(container, 4, '📌');
      clickButtonAndVerifyResult(container, 8, '🦶');
      clickButtonAndVerifyResult(container, 5, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });
    test('that a winner will be identified when 3 📌s go accross the bottom row', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 0, '🦶');
      clickButtonAndVerifyResult(container, 6, '📌');
      clickButtonAndVerifyResult(container, 1, '🦶');
      clickButtonAndVerifyResult(container, 8, '📌');
      clickButtonAndVerifyResult(container, 4, '🦶');
      clickButtonAndVerifyResult(container, 7, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });
    
    test('that a winner will be identified when 3 📌s go accross the left column', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 4, '🦶');
      clickButtonAndVerifyResult(container, 3, '📌');
      clickButtonAndVerifyResult(container, 8, '🦶');
      clickButtonAndVerifyResult(container, 0, '📌');
      clickButtonAndVerifyResult(container, 1, '🦶');
      clickButtonAndVerifyResult(container, 6, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });
    test('that a winner will be identified when 3 📌s go accross the center column', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 3, '🦶');
      clickButtonAndVerifyResult(container, 4, '📌');
      clickButtonAndVerifyResult(container, 6, '🦶');
      clickButtonAndVerifyResult(container, 1, '📌');
      clickButtonAndVerifyResult(container, 5, '🦶');
      clickButtonAndVerifyResult(container, 7, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });
    test('that a winner will be identified when 3 Os go accross the right column', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 1, '🦶');
      clickButtonAndVerifyResult(container, 2, '📌');
      clickButtonAndVerifyResult(container, 0, '🦶');
      clickButtonAndVerifyResult(container, 5, '📌');
      clickButtonAndVerifyResult(container, 7, '🦶');
      clickButtonAndVerifyResult(container, 8, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });    

    test('that a winner will be identified when 3 📌s go accross the top-left to bottom-right', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 1, '🦶');
      clickButtonAndVerifyResult(container, 0, '📌');
      clickButtonAndVerifyResult(container, 3, '🦶');
      clickButtonAndVerifyResult(container, 4, '📌');
      clickButtonAndVerifyResult(container, 7, '🦶');
      clickButtonAndVerifyResult(container, 8, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });  
    test('that a winner will be identified when 3 📌s go accross the top-right to bottom-left', () => {
      // Arrange
      const { container } = render(<App />);

      // Act
      clickButtonAndVerifyResult(container, 0, '🦶');
      clickButtonAndVerifyResult(container, 2, '📌');
      clickButtonAndVerifyResult(container, 3, '🦶');
      clickButtonAndVerifyResult(container, 4, '📌');
      clickButtonAndVerifyResult(container, 7, '🦶');
      clickButtonAndVerifyResult(container, 6, '📌');

      // Assert
      const winnerScreen = screen.queryByText('Winner is 📌')
      expect(winnerScreen).not.toBeNull();
      expect(winnerScreen).toBeInTheDocument();
    });       
  });

  describe('Wave 4:  reset game button', () => {
    test('App has a "Reset Game" button', () => {
      // Arrange-Act
      render(<App />);
  
      const resetButton = screen.getByText('Reset Game');
  
      // Assert
      expect(resetButton).toBeInTheDocument();
    });
  
    test('the button resets the game', () => {
      // Arrange - click on some squares
      const { container } = render(<App />);
      clickButtonAndVerifyResult(container, 0, '🦶');
      clickButtonAndVerifyResult(container, 2, '📌');

      // Find the reset button
      const resetButton = screen.queryByText(/[Rr]eset\s+[Gg]ame/);

      // Act - Click the reset button
      fireEvent.click(resetButton);

      // Assert - There should no longer be Xs or Os 
      // on the board.
      const xSquare = screen.queryByText('🦶');
      expect(xSquare).toBeNull();

      const oSquare = screen.queryByText('📌');
      expect(oSquare).toBeNull();
    });
  });
});