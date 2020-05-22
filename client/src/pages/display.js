import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Shoplist from "../components/ShopList";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { Container, Row, Col } from "../components/Grid";
import Button from "../components/Button";
import Form from "../components/Form";
import API from "../utils/API";
import UsersList from "../components/List";
import LoadingGif from "../components/Modal/imgs/loadingChick.gif";
// import notFoundPic from "../components/Modal/imgs/notFound.jpg";
import Card from "../components/Card";

class Display extends Component {

  state = {
    showModalOne: false,
    showModalTwo: false,
    searchTerm: "",
    items: [],
    lists: [],
    currentList: {},
    listInputText: "",
    scrapForModal: {},
    loading: false,
    userid: "",
    isLoggedIn: false,
    notLoading: false,
    hideform: false,
    totalPrice: 0
  };

  componentDidMount() {
    //Get the user from localstorage, prime the state
    const id = localStorage.getItem("id");
    this.setState({
      userid: id,
      isLoggedIn: true,
      totalPrice: 0
    });

    //we use this later to add lists into state
    const handleListInsert = (item) => {
      const listOb = {
        listName: item.listName,
        id: item._id
      }

      this.state.lists.push(listOb);
      this.setState({ currentList: this.state.lists[0] })
      this.forceUpdate();
      this.hideForm();
    }

    //once we find the lists for the user, we want to populate the current list
    const callPopulate = () => {
      this.populateItems(this.state.currentList);
    }

    //get all the lists associated with the current user
    API.getUserLists(id)
      .then(function (response) {
        response.data.forEach(handleListInsert);
        callPopulate();
      });
  };

  //This is our event to call the craigslist scraper 
  searchForCraiglist = (event) => {
    const handleModalInsert = (scrapedData) => {
      this.setState({ scrapForModal: scrapedData, notLoading: true });
    }
    event.preventDefault();
    if (!this.state.searchTerm) {
      alert("Please enter a search term!");
    } else {
      this.setState({ showModalOne: true, notloading: false })
      API.scrapecraiglist(this.state.searchTerm).then(function (response) {
        const scrapedData = {
          name: response.data.name,
          price: response.data.price,
          link: response.data.link,
          image: response.data.image,
          website: "Craigslist"
        }
        handleModalInsert(scrapedData);
      })
        .catch(err => console.log(err));
    }
  }

  //this function populates the selected list with its associated items in the database.
  populateItems = (nextList) => {
    const pushItem = (ItemData) => {
      this.state.items.push(ItemData);
      const priceNum = ItemData.price.slice(1);
      this.setState((state) => {
        return { totalPrice: state.totalPrice + parseFloat(priceNum) };
      });
      this.forceUpdate();
    }

    const findItem = (ItemID) => {
      API.getOneItem(ItemID).then(function (itemData) {
        pushItem(itemData.data);
      })
    }

    API.getOneList(nextList.id)
      .then(function (response) {
        response.data.Items.forEach(findItem);
      })
      .catch(err => console.log(err));

  };

  //This function adds an item found by the scraper 
  addNewItem = (event) => {
    event.preventDefault();

    const newItem = {
      name: this.state.scrapForModal.name,
      price: this.state.scrapForModal.price,
      website: this.state.scrapForModal.website,
      link: this.state.scrapForModal.link,
      image: this.state.scrapForModal.image
    }

    const addItemToList = (scrapedData) => {

      this.state.items.push(scrapedData);
      const priceNum = scrapedData.price.slice(1);

      this.setState((state) => {
        return { totalPrice: state.totalPrice + parseFloat(priceNum) };
      });

      this.forceUpdate();

      API.addItemToList(this.state.currentList.id, scrapedData).then(function (response) {

      });
    }
    this.setState({ showModalOne: false })
    API.saveItem(newItem).then(function (response) {
      addItemToList(response.data);
    });

  }

  //this handles calling the walmart scraper and collecting the data
  searchWall = (event) => {
    const handleModalInsert = (scrapedData) => {
      this.setState({ scrapForModal: scrapedData, notLoading: true });
    }
    event.preventDefault();
    if (!this.state.searchTerm) {
      alert("Please enter search term!");
    } else {
      this.setState({ showModalOne: true, notLoading: false })
      API.scrapeWalmart(this.state.searchTerm).then(function (response) {
        const scrapedData = {
          name: response.data.name,
          price: response.data.price,
          link: "http://www." + response.data.link,
          image: response.data.image,
          website: "Walmart"
        }
        handleModalInsert(scrapedData);
      })
        .catch(err => console.log(err));
    }
  }

  //this is used to help the modal display
  hideModalOne = () => {
    this.setState({ showModalOne: false })
  }

  //this is used to help the modal display
  displayModalTwo = (event) => {
    event.preventDefault();
    this.setState({ showModalTwo: true })

  };

  //this is used to help the modal display
  hideModalTwo = () => {
    this.setState({ showModalTwo: false })
  }

  // this is the event for adding an item searched for to a list
  submitListModal = (event) => {
    const handleListInsert = (listOb) => {
      this.state.lists.push(listOb);
      this.setState({
        listInputText: "",
        currentList: listOb,
        items: [],
        totalPrice: 0
      });
      this.populateItems(listOb);
    }
    event.preventDefault();
    this.hideForm();
    API.saveList({
      listName: this.state.listInputText
    }).then(function (response) {
      const newList = {
        listName: response.data.listName,
        id: response.data._id
      }
      handleListInsert(newList)
    })
    this.setState({ showModalTwo: false })
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });

  };

  hideForm = () => {
    this.state.lists === [] ? this.setState({ hideForm: false }) : this.setState({ hideForm: true })
  }

  //Helps swap between lists
  switchList = (nextList) => {
    this.setState(
      {
        currentList: nextList,
        items: [],
        totalPrice: 0
      },
      this.populateItems(nextList)
    );
  }


  render() {

    const loadingStyle = {
      width: "29.25rem",
      height: "auto"
    };

    return (
      <Container items="floatie">
        <Row>
          <Col size="3">
            <Sidebar>
              {this.state.lists.map(listOb => (
                <UsersList
                  name={listOb.listName}
                  id={listOb.id}
                  key={listOb.id}
                  buttonClick={
                    //swaps to the clicked list
                    this.clickList = event => {
                      event.preventDefault();
                      var nextList = {
                        listname: listOb.listName,
                        id: listOb.id
                      }

                      this.switchList(nextList);

                    }
                  }
                ></UsersList>
              ))}
            </Sidebar>
            <Button
              click={this.displayModalTwo}
              title="Add a List"
            ></Button>
            <Modal
              hideModal={this.hideModalTwo}
              showModalTwo={this.state.showModalTwo}
              title="What would you like to name your new list?"
              body={<Form
                name="listInputText"
                onChange={this.handleInputChange}
                value={this.state.listInputText}
              ></Form>}
              footerClass={true}
              buttonOne="Save"
              buttonTwo="Cancel"
              submit={this.submitListModal}
            ></Modal>
          </Col>
          <Col size="8">

            <Shoplist>
              {this.state.items.map(Item => (
                <tr className="table-success" key={Item._id}>
                  <th className="">
                    <button
                      type="button"
                      className=" btn-sm btn btn-outline-danger btn-dark"
                      onClick={
                        //this is the functionality for deleting an item from a list
                        this.clickDelete = event => {
                          event.preventDefault();

                          const callPopulate = () => {
                            this.setState({ items: [], totalPrice: 0 });
                            this.populateItems(this.state.currentList);
                          }

                          API.deleteItemFromList(this.state.currentList.id, Item).then(function (response) {
                            callPopulate();
                          });

                          API.deleteItem(Item._id);
                        }
                      }
                    >X</button>
                  </th>
                  <td>{Item.name}</td>
                  <td>{Item.price}</td>
                  <td><a href={Item.link} target="_blank" rel="noopener noreferrer">Link</a></td>
                  <td>{Item.website}</td>
                </tr>
              ))}
            </Shoplist>
            <Card>
              {"Total Cost: $" + this.state.totalPrice}
            </Card>

            <div className="row d-flex justifiy-content-center">
              <Input
                hideform={this.state.hideForm}
                clickWall={this.searchWall}
                clickCraigs={this.searchForCraiglist}
                handleInputChange={this.handleInputChange}
                searchTerm={this.state.searchTerm}
              ></Input>

            </div>
          </Col>

          <Modal
            hideModal={this.hideModalOne}
            showModalOne={this.state.showModalOne}
            title={this.state.notLoading ? "Is This What you Wanted?" : "Cheap Cheep is searching, please wait..."}
            body={this.state.notLoading ?
              <div>
                <h3>{this.state.scrapForModal.name}</h3>
                <img
                  className="float-center"
                  src={this.state.scrapForModal.image}
                  alt={this.state.scrapForModal.name}
                />
              </div>
              :
              <div>
                <img
                  style={loadingStyle}
                  src={LoadingGif}
                  alt="LoadingGif"
                />
              </div>
            }
            footerClass={this.state.notLoading}
            buttonOne="Yes"
            buttonTwo="No"
            submit={this.addNewItem}
          ></Modal>
        </Row >
      </Container >
    );
  }
}

export default Display;